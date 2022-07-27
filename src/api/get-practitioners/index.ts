import axios from 'axios'
import { ProvidersType } from '../../utils'
import {
  GetPractitionersParamsType,
  IGetPractitionersResponse,
  ParsePractitionersParmsType,
} from './types'

export const parsePractitioners = ({
  setLoading,
  setProviders,
  providerIds,
  providers,
  onLoad,
  initialized,
  setInitialized,
}: ParsePractitionersParmsType) => {
  const parsedProviders: ProvidersType[] = []

  if (providers.total > 0) {
    providerIds.map(provider => {
      if (!parsedProviders.find(({ id }) => id === provider)) {
        parsedProviders.push({
          id: provider,
          name: providers.entry.find(({ resource }) => resource.id === provider)
            ?.resource.name[0].text,
        })
      }
    })
  }

  if (!initialized) {
    onLoad()
    setInitialized(true)
  }

  setProviders(parsedProviders)
  setLoading(false)
}

export const getPractitioners = ({
  setLoading,
  onError,
  setProviders,
  api,
  providerIds,
  patientId,
  patientKey,
  onLoad,
  initialized,
  setInitialized,
}: GetPractitionersParamsType) => {
  setLoading(true)

  axios
    .get<IGetPractitionersResponse>(`${api}/Practitioner`, {
      params: {
        patient: patientId,
        patient_key: patientKey,
      },
    })
    .then(response => {
      parsePractitioners({
        setLoading,
        setProviders,
        providerIds,
        providers: response.data,
        onLoad,
        initialized,
        setInitialized,
      })
    })
    .catch(e => onError(e, 'Error Fetching Providers'))
}
