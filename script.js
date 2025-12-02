// NASA API Key
const apiKey = "YOUR_API_KEY"; //

// Function to fetch Mars Rover photos
async function fetchMarsPhotos(date) {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        return data.photos.slice(0, 3); // Get up to 3 photos
    } catch (error) {
        console.error("Error fetching Mars photos:", error);
        return [];
    }
}

// Function to display fetched photos in the UI
function displayPhotos(photos) {
    const gallery = document.getElementById("photoGallery");
    gallery.innerHTML = ""; // Clear previous photos

    if (photos.length === 0) {
        gallery.innerHTML = "<p>No photos available for this date.</p>";
        return;
    }

    photos.forEach(photo => {
        const img = document.createElement("img");
        img.src = photo.img_src;
        img.alt = `Mars Rover Photo taken on ${photo.earth_date}`;
        gallery.appendChild(img);
    });
}

// Event listener for user-selected date
document.getElementById("loadPhotos").addEventListener("click", async () => {
    const date = document.getElementById("photoDate").value;
    if (!date) {
        alert("Please select a date.");
        return;
    }

    const photos = await fetchMarsPhotos(date);
    displayPhotos(photos);
});

// Load photos from a significant date when the page opens
window.onload = async () => {
    const significantDate = "2021-10-02"; // Example: Start of a solar conjunction
    const photos = await fetchMarsPhotos(significantDate);
    displayPhotos(photos);
};
