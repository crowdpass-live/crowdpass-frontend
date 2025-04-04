import  useGetAllEvents  from "./useGetAllEvents";
import  useIsTicketHolder from "./useIsTicketHolder";

const useGetEventsWithTickets = (address: `0x${string}`) => {
  // Get all events
  const { events, isLoading: isLoadingEvents, isError: isEventsError, error: eventsError } = useGetAllEvents();
  
  // For each event, check if the address has a ticket
  const eventChecks = events?.map(event => ({
    event,
    ticketCheck: useIsTicketHolder(event.id, address)
  })) || [];

  // Filter events where the user has a ticket
  const eventsWithTickets = eventChecks
    .filter(({ ticketCheck }) => ticketCheck.data === true)
    .map(({ event }) => event);

  // Combined loading state
  const isLoading = isLoadingEvents || eventChecks.some(check => check.ticketCheck.isLoading);

  // Combined error state
  const isError = isEventsError || eventChecks.some(check => check.ticketCheck.isError);
  const error = isEventsError ? eventsError : eventChecks.find(check => check.ticketCheck.isError)?.ticketCheck.error;

  return {
    events: eventsWithTickets,
    isLoading,
    isError,
    error
  };
};

export default useGetEventsWithTickets;