import { Router } from 'express';
import { v4 } from 'uuid';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
    id: string;
    provider: string;
    date: Date;
}

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parseDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointments.find(appointment =>
        isEqual(parseDate, appointment.date)
    )

    if (findAppointmentInSameDate) {
        return response.status(400).json({ message: 'This appointment is already booked' })
    }

    const appointment = {
        id: v4(),
        provider,
        date: parseDate
    }

    appointments.push(appointment);

    return response.json(appointment)
})

export default appointmentsRouter;