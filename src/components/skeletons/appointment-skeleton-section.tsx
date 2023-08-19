import AppointmentCardSkeleton from "./appointment-card-skeleton";

export default function AppointmentSkeletonSection() {
  return (
    <div>
      <ul className="divide-y divide-gray-200">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <AppointmentCardSkeleton key={i} />
          ))}
      </ul>
    </div>
  );
}
