
    const addReservation = function(date, hourSpan, tables, name, phoneNumber) {

        let documentName = format(date, "y-MM-dd") + "T" + hourSpan[0] + ":00";

        tablesArray = [];

        tables.forEach((table, i) => {
            if (table) {
                tablesArray.push(i + 1);
            }
        });
        
        // Add a new document in collection "cities"
        db.collection("reservations").doc(documentName).set({
          duration: hourSpan[1],
          name: name,
          phone_number: phoneNumber,
          spots: tablesArray
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }