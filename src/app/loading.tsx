import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <h1 className='text-4xl font-bold'>Loading... <Loader /></h1>
    </div>
  )
}
