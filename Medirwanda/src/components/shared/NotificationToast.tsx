import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function notifySuccess(message: string) {
  toast.success(message, { position: 'top-right', theme: 'dark' })
}

export function notifyError(message: string) {
  toast.error(message, { position: 'top-right', theme: 'dark' })
}

export default function NotificationToast() {
  return <ToastContainer />
}