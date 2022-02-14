import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'
import {
  Loader,
  ParsedSlotsType,
  Popover,
  ProvidersType,
} from '@canvas/embed-common'
import { useAppContext } from '../../hooks'
import { TimeSlots } from './time-slots'
import { ConfirmAppointment } from './confirm-appointment'

type UiPropsType = {
  timeSlots: ParsedSlotsType[]
}

type SelectTimeSlotType = {
  start: string
  end: string
  provider: ProvidersType
}

export const Ui = ({ timeSlots }: UiPropsType) => {
  const { colors, setTimeSlot, loading, shadowRoot, resetTimeSlot } =
    useAppContext()
  const [popoverOpen, setPopoverOpen] = useState(false)

  const selectTimeSlot = ({ start, end, provider }: SelectTimeSlotType) => {
    setTimeSlot({
      start,
      end,
      provider,
    })
    setPopoverOpen(true)
  }

  const cancelConfirmation = () => {
    setPopoverOpen(false)
    resetTimeSlot()
  }

  if (loading) {
    return <Loader colors={colors} />
  }

  return (
    <Fragment>
      {timeSlots.map(({ provider, providerSlots }) => {
        return (
          <TimeSlots
            key={provider.id}
            provider={provider}
            slots={providerSlots}
            selectTimeSlot={selectTimeSlot}
          />
        )
      })}
      <Popover
        shadowRoot={shadowRoot}
        open={popoverOpen}
        titleId={'confirm-slot'}
      >
        <ConfirmAppointment onCancel={() => cancelConfirmation()} />
      </Popover>
    </Fragment>
  )
}
