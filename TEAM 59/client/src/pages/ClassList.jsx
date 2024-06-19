import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const ClassList = () => {
  const navigate = useNavigate();
  const data = [
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "4" },
    { name: "5" },
  ];

  const handlePress = (className) => {
    navigate(`/studentlist/${className}`);
  };

  return (
    <div
      className="bg-blue-400 flex justify-center h-screen items-center gap-2 flex-wrap"
    >
      {data.map((item) => (
        <Card
          key={item.name}
          className="py-4 bg-white p-1 rounded-2xl"
          isPressable
          onPress={() => handlePress(item.name)}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
            <small className="text-default-500 text-xl">Class</small>
            <h4 className="font-bold text-2xl text-black">{item.name}</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-2xl w-30"
              src={"./Class.jpg"}
              width={180}
            />
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default ClassList;
