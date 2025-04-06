export const detailsTabs = [
    "Schedule",
    "Tickets",
    "Workshops",
    "Speakers",
  ];
  
  export const dummyEvents = [
    {
      eventId: 0,
      eventImage: "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633486/event-1_kspr0f.png",
      eventName: "Web3 Lagos Conference",
      eventStartDate: "1725526800",
      eventEndDate: "1725735600",
      eventLocation: "Lagos, Nigeria",
      description:
        "The Web3 Lagos Conference is the largest Web3 Event in Lagos, Nigeria. This conference will bring together Web3 enthusiasts from all over Nigeria and beyond. Here, community meets technology for three days of intensive Networking and Learning experiences. Future of money, you deserve to be in the know!",
      numberOfTickets: 2000,
      numberOfRegistration: 2000,
      paid: false,
      ticketsType: [
        { type: "Vip", price: 10, numberOfTickets: 0, sold: 0 },
        { type: "Regular", price: 5, numberOfTickets: 0, sold: 0 },
        { type: "Early bird", price: 3, numberOfTickets: 0, sold: 0 },
      ],
    },
  ];
  
  export const tabs = ["Upcoming", "Ongoing", "Ended"];

  export const categories = [
  "Sports",
  "Festivals",
  "Gaming",
  "Wellness",
  "Exhibition",
  "Travels",
  "Family",
  "Fundraisers",
  "Concerts",
  "Climate",
  "Theatre",
  "Technology",
  "Webinars",
  "Corperate",
  "Networking",
  "Education",
];

export const payments = ["Paid", "Free"];

export const locations = ["Remote", "In-Person"];

export const dates = ["from", "to"];