import { site } from "../../config/site";

export default function AnnouncementBar() {
  const hours = site.openingHours[0];
  return (
    <div className="bg-ink text-cream">
      <p className="container-page py-2 text-center text-xs tracking-wide">
        {site.announcement}
        {hours && (
          <span className="hidden text-accent-light sm:inline">
            {" "}
            · Open {hours.days}, {hours.hours}
          </span>
        )}
      </p>
    </div>
  );
}
