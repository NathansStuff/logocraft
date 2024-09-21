import RedirectToLogin from '@/components/Sections/RedirectToLogin';

export default function SuccessPage() {
  return (
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <div className='rounded-lg bg-white p-6 text-center shadow-lg'>
        <h1 className='text-2xl font-bold text-green-600'>Password Reset Successful</h1>
        <p className='mt-4 text-gray-600'>You will be redirected to the login page shortly.</p>
      </div>
      <RedirectToLogin /> {/* Client-side redirect logic */}
    </div>
  );
}
