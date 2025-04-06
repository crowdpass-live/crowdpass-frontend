type FilterState = {
    categories: string[];
    locations: string[];
    payments: string[];
    startDate: string;
    endDate: string;
    searchQuery: string;
  };

export const getFilteredEvents = (
    data: any[],
    tabIndex: number,
    filterState: FilterState
  ) => {
    let filteredData = data;
  
    // Tab-based filtering
    switch (tabIndex) {
      case 0:
        filteredData = data.filter(
          (event: any) => Number(event.start_date) > Date.now() / 1000
        );
        break;
      case 1:
        filteredData = data.filter(
          (event: any) => Number(event.start_date) < Date.now() / 1000 && Number(event.end_date) > Date.now() / 1000
        );
        break;
      case 2:
        filteredData = data.filter(
          (event: any) => Number(event.end_date) <= Date.now() / 1000
        );
        break;
      default:
        filteredData = [];
    }
  
    // Filter by categories
    if (filterState.categories.length > 0) {
      filteredData = filteredData.filter((event: any) =>
        filterState.categories.includes(event.attributes[2].value)
      );
    }
  
    // Filter by locations
    if (filterState.locations.length > 0) {
      filteredData = filteredData.filter((event: any) =>
        filterState.locations.includes(event.attributes[3].value)
      );
    }
  
    // Filter by payment types
    if (filterState.payments.length > 0) {
      filteredData = filteredData.filter((event: any) => {
        if (filterState.payments.includes('Free') && Number(event.ticket_price) === 0) {
          return true;
        }
        if (filterState.payments.includes('Paid') && Number(event.ticket_price) > 0) {
          return true;
        }
        return false;
      });
    }
  
    // Filter by date range
    if (filterState.startDate) {
      filteredData = filteredData.filter(
        (event: any) =>
          event.start_date >= new Date(filterState.startDate).getTime() / 1000
      );
    }
    if (filterState.endDate) {
      filteredData = filteredData.filter(
        (event: any) =>
          event.end_date <= new Date(filterState.endDate).getTime() / 1000
      );
    }
  
    // Filter by search query
    if (filterState.searchQuery) {
      filteredData = filteredData.filter((event: any) =>
        event.name.toLowerCase().includes(filterState.searchQuery.toLowerCase())
      );
    }
  
    return filteredData;
  };