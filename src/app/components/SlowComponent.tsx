async function getSlowData() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return "This data took 3 seconds to load!";
}

export default async function SlowComponent() {
  const data = await getSlowData();

  return (
    <div>
      <h3>SLOW Component</h3>
      <p>{data}</p>
    </div>
  );
}
