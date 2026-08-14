import goldenRetriever from "../assets/images/pets/dog2.jpg";
import polishRabbit from "../assets/images/pets/rabbit1.jpeg";
import britishShorthair from "../assets/images/pets/britishShorthair.jpg";

const adoptionHistory = [
  {
    id: 1,
    name: "Milo",
    breed: "Golden Retriever",
    age: "1 Year",
    gender: "Male",
    status: "Application Under Review",
    image: goldenRetriever,
  },
  {
    id: 2,
    name: "Layla",
    breed: "Polish Rabbit",
    age: "6 Months",
    gender: "Female",
    status: "Meet & Greet Scheduled",
    image: polishRabbit,
  },
  {
    id: 3,
    name: "Nemo",
    breed: "British Shorthair",
    age: "7 Months",
    gender: "Female",
    status: "Approved",
    image: britishShorthair,
  },
];

export default adoptionHistory;