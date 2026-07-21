import prisma from './src/config/prisma.js';
async function main() {
    const res = await prisma.reservation.findMany({
        include: {
            inscription: {
                include: {
                    candidate: true,
                    formation: true,
                    professor: true
                }
            },
            professor: true,
            room: true
        }
    });
    console.log('Reservations Count:', res.length);
    console.log(JSON.stringify(res.map(r => ({
        id: r.id,
        reservationCode: r.reservationCode,
        reservationDate: r.reservationDate,
        startTime: r.startTime,
        endTime: r.endTime,
        inscription: {
            inscriptionCode: r.inscription?.inscriptionCode,
            candidate: r.inscription?.candidate ? `${r.inscription.candidate.firstName} ${r.inscription.candidate.lastName}` : null,
            formation: r.inscription?.formation ? r.inscription.formation.matiere : null,
            professor: r.inscription?.professor ? `${r.inscription.professor.prenom} ${r.inscription.professor.nom}` : null
        },
        professor: r.professor ? `${r.professor.prenom} ${r.professor.nom}` : null,
        room: r.room ? r.room.numero : null
    })), null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
