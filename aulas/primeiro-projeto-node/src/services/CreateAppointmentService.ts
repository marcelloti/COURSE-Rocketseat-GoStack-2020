import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment'
import AppointmentRepository from '../repositories/AppointmentsRepository';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import appointmentsRouter from '../routes/appointments.routes';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ date, provider }: Request): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate)

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked')
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;