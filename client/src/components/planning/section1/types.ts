import type { GeneralDataFormValues } from '@/types'
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'

export type Section1FormProps = {
  register: UseFormRegister<GeneralDataFormValues>
  errors: FieldErrors<GeneralDataFormValues>
}

export type Section1ControlProps = Section1FormProps & {
  control: Control<GeneralDataFormValues>
}

export type Section1WatchProps = Section1FormProps & {
  watch: UseFormWatch<GeneralDataFormValues>
}
