import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type TeacherRowProps = {
  userName: string
}

export function TeacherRow({ userName }: TeacherRowProps) {
  return (
    <div className="flex flex-col items-center">
      <Label
        htmlFor="user"
        className="block bg-[#7C2855] px-3 py-2 text-sm text-white text-center border border-dashed w-3/5"
      >
        1.15 Nombre y firma del docente autor
      </Label>
      <Input
        id="user"
        readOnly
        className="border-gray-400 rounded-none border-dashed text-center w-3/5 h-20 bg-gray-100 cursor-not-allowed"
        type="text"
        value={userName}
      />
    </div>
  )
}
