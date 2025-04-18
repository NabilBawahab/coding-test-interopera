import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  CardFooter,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { useState } from "react";
import { EllipsisVertical } from "lucide-react";

export const SalesCard = ({ salesReps }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); //Modal HERO UI

  const [selectedSalesReps, setSelectedSalesReps] = useState(null);

  const handleShowDetail = (salesReps) => {
    setSelectedSalesReps(salesReps);
  };

  const getStatusColor = (status) => {
    if (status === "Closed Won") {
      return "text-white bg-green-500 font-bold border rounded-lg px-2 py-1 w-28 text-center text-xs";
    }
    if (status === "Closed Lost") {
      return "text-white bg-red-500 font-bold border rounded-lg px-2 py-1 w-28 text-center text-xs";
    }
    return "text-white bg-blue-500 font-bold border rounded-lg px-2 py-1 w-28 text-center text-xs";
  };

  //Currency format
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return (
    <>
      {salesReps.map((rep) => {
        return (
          <Card key={rep.id}>
            <CardHeader>
              <div>
                <strong className="text-blue-500">{rep.name}</strong>
                <p className="text-slate-700">{rep.role}</p>
              </div>
            </CardHeader>
            <CardBody className="flex justify-center">
              <Image
                width={270}
                className="object-cover w-full"
                src="/blankprofile.png"
              />
            </CardBody>
            <CardFooter className="flex justify-end">
              <Button
                isIconOnly
                size="sm"
                radius="lg"
                type="button"
                variant="light"
                color="primary"
                onPress={() => {
                  handleShowDetail(rep);
                  onOpen();
                }}
              >
                <EllipsisVertical size={20} />
              </Button>
            </CardFooter>
          </Card>
        );
      })}
      {selectedSalesReps && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Details for {selectedSalesReps.name}
                </ModalHeader>
                <ModalBody>
                  <h3>
                    <strong>Full Name: </strong>
                    {selectedSalesReps.name}
                  </h3>
                  <p>
                    <strong>Role: </strong>
                    {selectedSalesReps.role}
                  </p>
                  <p>
                    <strong>Region: </strong>
                    {selectedSalesReps.region}
                  </p>
                  <h4>Skills:</h4>
                  <ol className="list-disc px-4">
                    {selectedSalesReps.skills.map((skill, index) => {
                      return <li key={index}>{skill}</li>;
                    })}
                  </ol>
                  <h4>Deals: </h4>
                  {selectedSalesReps.deals &&
                  selectedSalesReps.deals.length > 0 ? (
                    <ol className="list-disc px-4">
                      {selectedSalesReps.deals.map((deal, index) => {
                        const formattedValue = currencyFormatter.format(
                          deal.value
                        );
                        return (
                          <li key={index}>
                            <div>
                              <strong>Client: </strong>
                              {deal.client}, <strong>Value: </strong>{" "}
                              {formattedValue}
                            </div>
                            <div className="flex space-x-2 items-center">
                              <strong>Status: </strong>
                              <div className={getStatusColor(deal.status)}>
                                {deal.status}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  ) : (
                    <p>No deals yet.</p>
                  )}
                  <h4>Clients: </h4>
                  {selectedSalesReps.clients &&
                  selectedSalesReps.clients.length > 0 ? (
                    <ol className="list-disc px-4">
                      {selectedSalesReps.clients.map((client, index) => {
                        return (
                          <li key={index}>
                            <strong>Client: </strong>
                            {client.name}, <strong>Industry: </strong>
                            {client.industry}
                            <div>
                              <strong>Contact: </strong>
                              {client.contact}
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  ) : (
                    <p>No clients assigned yet.</p>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary">Call</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
