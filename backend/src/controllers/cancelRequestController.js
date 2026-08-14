import prisma from '../config/prisma.js';

export const createCancelRequest = async (req, res) => {
    const { reservationId, reason } = req.body;

    if (!reservationId || typeof reservationId !== 'string' || reservationId.trim() === '') {
        return res.status(400).json({ message: 'error', error: 'RESERVATION_ID_REQUIRED' });
    }
    if (!reason || typeof reason !== 'string' || reason.trim() === '') {
        return res.status(400).json({ message: 'error', error: 'REASON_REQUIRED' });
    }

    if (!req.user || req.user.role !== 'PROFESSOR' || !req.user.professorId) {
        return res.status(403).json({ message: 'error', error: 'ONLY_PROFESSORS_CAN_REQUEST_CANCELLATION' });
    }

    try {
        // Find Reservation
        const reservation = await prisma.reservation.findUnique({
            where: { id: reservationId },
            include: { cancelRequests: true }
        });

        if (!reservation) {
            return res.status(404).json({ message: 'error', error: 'RESERVATION_NOT_FOUND' });
        }

        // Verify ownership
        if (reservation.professorId !== req.user.professorId) {
            return res.status(403).json({ message: 'error', error: 'UNAUTHORIZED_RESERVATION_OWNERSHIP' });
        }

        // Verify status
        if (reservation.status === 'CANCELLED') {
            return res.status(400).json({ message: 'error', error: 'RESERVATION_ALREADY_CANCELLED' });
        }

        // Verify duplicate pending request
        const existingPendingRequest = reservation.cancelRequests.find(r => r.status === 'PENDING');
        if (existingPendingRequest) {
            return res.status(400).json({ message: 'error', error: 'CANCEL_REQUEST_ALREADY_PENDING' });
        }

        // Verify 24 hours rule
        const sessionStartTime = new Date(reservation.startTime).getTime();
        const currentServerTime = new Date().getTime();
        const diffInMs = sessionStartTime - currentServerTime;
        const limitInMs = 24 * 60 * 60 * 1000;

        if (diffInMs <= limitInMs) {
            return res.status(400).json({
                message: 'error',
                error: "La demande d'annulation n'est possible que plus de 24 heures avant le début de la séance."
            });
        }

        // Create Cancel Request
        const cancelRequest = await prisma.cancelRequest.create({
            data: {
                reservationId,
                professorId: req.user.professorId,
                reason: reason.trim(),
                status: 'PENDING'
            },
            include: {
                reservation: true
            }
        });

        return res.status(201).json({ message: 'success', data: cancelRequest });
    } catch (error) {
        return res.status(500).json({ message: 'error', error: error.message });
    }
};

export const getCancelRequests = async (req, res) => {
    try {
        const cancelRequests = await prisma.cancelRequest.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                professor: true,
                reservation: {
                    include: {
                        room: true,
                        inscription: {
                            include: {
                                candidate: true,
                                formation: true
                            }
                        }
                    }
                }
            }
        });

        return res.json({ message: 'success', data: cancelRequests });
    } catch (error) {
        return res.status(500).json({ message: 'error', error: error.message });
    }
};

export const approveCancelRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const cancelRequest = await prisma.cancelRequest.findUnique({
            where: { id },
            include: { reservation: true }
        });

        if (!cancelRequest) {
            return res.status(404).json({ message: 'error', error: 'CANCEL_REQUEST_NOT_FOUND' });
        }

        if (cancelRequest.status !== 'PENDING') {
            return res.status(400).json({ message: 'error', error: 'CANCEL_REQUEST_ALREADY_PROCESSED' });
        }

        // Update cancel request and update reservation status to CANCELLED in a transaction
        const [updatedRequest, updatedReservation] = await prisma.$transaction([
            prisma.cancelRequest.update({
                where: { id },
                data: {
                    status: 'APPROVED',
                    processedAt: new Date(),
                    processedBy: req.user.email || req.user.name || 'SYSTEM'
                }
            }),
            prisma.reservation.update({
                where: { id: cancelRequest.reservationId },
                data: {
                    status: 'CANCELLED'
                }
            })
        ]);

        return res.json({ message: 'success', data: { cancelRequest: updatedRequest, reservation: updatedReservation } });
    } catch (error) {
        return res.status(500).json({ message: 'error', error: error.message });
    }
};

export const rejectCancelRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const cancelRequest = await prisma.cancelRequest.findUnique({
            where: { id }
        });

        if (!cancelRequest) {
            return res.status(404).json({ message: 'error', error: 'CANCEL_REQUEST_NOT_FOUND' });
        }

        if (cancelRequest.status !== 'PENDING') {
            return res.status(400).json({ message: 'error', error: 'CANCEL_REQUEST_ALREADY_PROCESSED' });
        }

        const updatedRequest = await prisma.cancelRequest.update({
            where: { id },
            data: {
                status: 'REJECTED',
                processedAt: new Date(),
                processedBy: req.user.email || req.user.name || 'SYSTEM'
            }
        });

        return res.json({ message: 'success', data: { cancelRequest: updatedRequest } });
    } catch (error) {
        return res.status(500).json({ message: 'error', error: error.message });
    }
};
