// components/filters/HomeFilters.js
import React from "react";
import { View, Button } from "react-native";
import DateFilter from "../common/filters/DateFilter";
import LocationFilter from "../common/filters/LocationFilter";
import SeatsFilter from "../common/filters/SeatsFilter";
import OrganizationFilter from "../common/filters/OrganizationFilter";
import DriverFilter from "../common/filters/DriverFilter";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCalendar,
  faMapMarkerAlt,
  faUsers,
  faBuilding,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const HomeFilters = ({ filters, onFiltersChange, onApplyFilters }) => {
  return (
    <View className="p-4 bg-white rounded-md shadow-md mb-4">
      <DateFilter
        value={filters.date}
        onChange={(date) => onFiltersChange((prev) => ({ ...prev, date }))}
      />

      <LocationFilter
        origin={filters.origin}
        destination={filters.destination}
        onOriginChange={(origin) =>
          onFiltersChange((prev) => ({ ...prev, origin }))
        }
        onDestinationChange={(destination) =>
          onFiltersChange((prev) => ({ ...prev, destination }))
        }
      />
      <SeatsFilter
        value={filters.availableSeats}
        onChange={(availableSeats) =>
          onFiltersChange((prev) => ({ ...prev, availableSeats }))
        }
      />
      <OrganizationFilter
        value={filters.organization}
        onChange={(organization) =>
          onFiltersChange((prev) => ({ ...prev, organization }))
        }
      />
      <DriverFilter
        value={filters.driver}
        onChange={(driver) => onFiltersChange((prev) => ({ ...prev, driver }))}
      />
      <Button title="Apply Filters" onPress={onApplyFilters} />
    </View>
  );
};

export default HomeFilters;
