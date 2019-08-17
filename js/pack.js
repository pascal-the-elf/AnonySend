async function pack() {
    var packed = [];
    await db.collection("User").doc(firebase.auth().currentUser.uid).collection("inbox").doc("anonymous").collection("msg").orderBy("time", "desc").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            let data = {
                from: doc.data().from,
                message: doc.data().message,
                time: doc.data().time.toDate().getTime(),
                resolved: doc.data().resolved,
                response: doc.data().response,
                security: doc.data().security
            };
            packed.push(data);
        });
    });
    return packed;
}
function packasJSON() {
    pack().then(packed => {
        var a = document.createElement("a");
        a.target = "_blank";
        a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(packed));
        a.download = "AnonySend."+Date.now()+".json";
        a.click();
    });
}
function packasHTML() {
    pack().then(packed => {
        
    });
}
