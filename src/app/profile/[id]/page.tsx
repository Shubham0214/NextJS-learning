export default function UserPage({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>

      <p className="text-3xl">Profile Page {params.id}</p>
    </div>
  );
}
