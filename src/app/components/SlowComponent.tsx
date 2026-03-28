async function getSlowData() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return "This data took 3 seconds to load!";
}

export default async function SlowComponent() {
  const data = await getSlowData();

  return (
    <div className="card bg-orange-50 border-orange-200">
      <h3 className="text-xl font-semibold text-orange-900 mb-2">
        SLOW Component
      </h3>
      <p className="text-orange-700">{data}</p>
    </div>
  );
}
