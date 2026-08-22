import React, { useState } from "react";
import { AddAddress } from "./AddAddress";
import { ChooseAddress } from "./ChooseAddress";

export function Address() {
  const [addressState, setAddressState] = useState({
    list: [],
    selectedId: null,
  });

  const { list: addresses, selectedId } = addressState;

  function handleAddAddress(newAddress) {
    const addressWithId = { ...newAddress, id: crypto.randomUUID() };
    setAddressState((prev) => ({
      list: [...prev.list, addressWithId],
      selectedId: addressWithId.id,
    }));
  }

  function handleRemoveAddress(idToRemove) {
    setAddressState((prev) => {
      const nextList = prev.list.filter((addr) => addr.id !== idToRemove);
      return {
        list: nextList,
        selectedId: nextList.length ? nextList[0].id : null,
      };
    });
  }

  return (
    <>
      <h2>Address</h2>
      {addresses.length > 0 && (
        <ChooseAddress
          addresses={addresses}
          selectedId={selectedId}
          onSelect={(id) =>
            setAddressState((prev) => ({ ...prev, selectedId: id }))
          }
          onRemoveAddress={handleRemoveAddress}
        />
      )}
      <AddAddress onAddAddress={handleAddAddress} />
    </>
  );
}
