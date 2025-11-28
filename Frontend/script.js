document.getElementById("whatsappForm").addEventListener("submit", function(e){
    e.preventDefault();

    let name = document.getElementById("name").value;
    let service = document.getElementById("service").value;
    let date = document.getElementById("date").value;

    let url = `https://wa.me/9993658088?text=New Inquiry:%0AName: ${name}%0AService: ${service}%0ADate: ${date}`;

    window.location.href = url;
});
