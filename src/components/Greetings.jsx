export default function Greeting({ name = "Admin" }) {
  const getGreeting = () => {
    const hour = Number(
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        hourCycle: "h23",
      }).format(new Date()),
    );

    if (hour < 12) {
      return "Good morning";
    }

    if (hour < 17) {
      return "Good afternoon";
    }

    return "Good evening";
  };

  return (
    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
      {getGreeting()}, {name}
    </h1>
  );
}
