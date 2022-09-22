import { h } from 'preact'
import date from 'date-and-time'
import { createEvent, DateArray } from 'ics'
import { useCallback, useEffect, useState } from 'preact/hooks'
import {
  AppointmentType,
  defaultAppointmentType,
  getAppointmentsList,
  Loader,
  putAppointment,
  Error,
  ErrorType,
  HandleErrorType,
  ProvidersType,
} from '@canvas-medical/embed-common'
import { IAppProps } from '../utils'

import { Ui } from './ui'

const noOp = () => {}

const defaultAppointment: AppointmentType = {
  id: '',
  code: '',
  description: '',
  display: '',
  locationId: '',
  providerId: '',
  start: '',
  end: '',
}

export const AppointmentsView = ({
  api,
  colors,
  callbacks,
  locationId,
  patientId,
  patientKey,
  providerIds,
  shadowRoot,
}: IAppProps) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ErrorType>()
  const [appointmentCancellation, setAppointmentCancellation] = useState({
    popoverOpen: false,
    appointment: defaultAppointment,
  })

  const [appointments, setAppointments] = useState<AppointmentType[]>([])
  const [providers, setProviders] = useState<ProvidersType[]>([])
  const [initialized, setInitialized] = useState<boolean>(false)
  const [loadStartTime] = useState(new Date())

  const handleCancel = (appointment: AppointmentType) => {
    setAppointmentCancellation({ popoverOpen: true, appointment })
  }

  const handleError: HandleErrorType = (error, msg) => {
    callbacks?.onError?.(error, msg)
    setError(msg)
    setLoading(false)
  }

  useEffect(() => {
    if (!loading && !initialized) {
      setInitialized(true)
      callbacks?.onLoad?.((new Date().getTime() - loadStartTime.getTime()))
    }
  }, [loading, initialized])

  const fetchAppointments = useCallback(() => {
    getAppointmentsList({
      setLoading,
      onError: handleError,
      setAppointments,
      setProviders,
      providerIds,
      api,
      patientId,
      patientKey,
    })
  }, [api, patientId, patientKey, providerIds])

  const onAddToCalendar = () => {
    try {
      appointments.map((appointment) => {
      // locationId comes back as auto-incrementing numbers
      // 1: Flatiron
      // 2: Upper East Side
      const locationAddresses = {
        '1': '100 5th Avenue, New York, NY 10011',
        '2': '1296 Third Ave, New York, NY 10021',
      }
        // Select address based on locationId
        let locationAddress
        const keys = Object.keys(locationAddresses)
        const appointmentLocationId = appointment.locationId as keyof Object
        if (appointmentLocationId && keys.includes(appointmentLocationId)) {
          locationAddress = locationAddresses[appointmentLocationId].toString()
        }
    
        const startDate = new Date(appointment.start)
        const appointmentStart = new Date(appointment.start).getTime()
        const appointmentEnd = new Date(appointment.end).getTime()
        const appointmentDuration = new Date(appointmentEnd - appointmentStart).getMinutes()
        const icsStartTime = date.format(startDate, 'YYYY;MM;DD;HH;mm').split(';').map(Number) as DateArray
        const validDescription =
            appointment.description &&
            appointment.description.length > 0 &&
            appointment.description !== 'No description given'
        const visitReason = validDescription ? appointment.description : appointment.display

        // generate ics string
        const { value } = createEvent({
        start: icsStartTime,
        duration: { minutes: appointmentDuration },
        title: 'Modern Age Appointment',
        description: `Thanks for booking an appointment with Modern Age. We look forward to your visit. Visit Reason: ${visitReason}`,
        location: locationAddress,
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        organizer: { name: 'Admin', email: 'info@modern-age.com' },
        attendees: [
          {
            rsvp: true,
            partstat: 'ACCEPTED',
            role: 'REQ-PARTICIPANT',
          },
        ],
      })
      // Open/Save link in Modern Browsers
      window.open(encodeURI('data:text/calendar;charset=utf8,' + value ?? ''))
    })
    } catch (e) {
      handleError(e as Error, 'Error Adding Appointment To Calendar')
    }
  }

  const afterCancel = () => {
    setAppointmentCancellation({
      popoverOpen: false,
      appointment: defaultAppointment,
    })
    fetchAppointments()
  }

  const onCancel = () => {
    try {
      putAppointment({
        onComplete: afterCancel,
        onError: handleError,
        setLoading,
        appointmentCoding: {
          code:
            appointmentCancellation?.appointment?.code ||
            defaultAppointmentType.code,
        },
        locationId:
          appointmentCancellation.appointment.locationId || locationId,
        timeSlot: {
          start: appointmentCancellation.appointment.start,
          end: appointmentCancellation.appointment.end,
          provider: {
            id: appointmentCancellation.appointment.providerId,
          },
        },
        patientId,
        patientKey,
        api,
        appointmentId: appointmentCancellation.appointment.id,
      })
    } catch (e) {
      handleError(e as Error, 'Error Cancelling Appointment')
    }
  }

  const onKeep = () => {
    setAppointmentCancellation({
      popoverOpen: false,
      appointment: defaultAppointment,
    })
  }

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  if (loading) {
    return <Loader colors={colors} />
  }

  if (error && error.length) {
    return <Error errorMessages={error} />
  }

  return (
    <Ui
      appointments={appointments}
      providers={providers}
      colors={colors}
      onCancel={onCancel}
      onKeep={onKeep}
      handleCancel={handleCancel}
      onAddToCalendar={onAddToCalendar}
      shadowRoot={shadowRoot}
      appointmentCancellation={appointmentCancellation}
    />
  )
}
