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

export const SalesCard = ({ salesReps }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); //Modal HERO UI

  const [selectedSalesReps, setSelectedSalesReps] = useState(null);

  const handleShowDetail = (salesReps) => {
    setSelectedSalesReps(salesReps);
  };

  const getStatusColor = (status) => {
    if (status === "Closed Won") {
      return "text-green-500";
    }
    if (status === "Closed Lost") {
      return "text-red-500";
    }
    return "text-blue-500";
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
                <strong>{rep.name}</strong>
                <p>{rep.role}</p>
              </div>
            </CardHeader>
            <CardBody className="flex justify-center">
              <Image
                width={270}
                className="object-cover w-full"
                src="https://mighty.tools/mockmind-api/content/human/124.jpg"
              />
            </CardBody>
            <CardFooter className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                onPress={() => {
                  handleShowDetail(rep);
                  onOpen();
                }}
              >
                Details
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
                            <div>
                              <strong>Status: </strong>
                              <span className={getStatusColor(deal.status)}>
                                {deal.status}
                              </span>
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
