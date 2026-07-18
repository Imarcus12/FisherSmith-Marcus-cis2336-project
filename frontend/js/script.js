console.log("Welcome to ArtConnect!");

const artworkGrid = document.querySelector("#artwork-grid");

if (artworkGrid) {
    const searchInput = document.querySelector("#search-input");
    const categoryFilter = document.querySelector("#category-filter");
    const sortSelect = document.querySelector("#sort-select");
    const resultsMessage = document.querySelector("#results-message");

    const modal = document.querySelector("#artwork-modal");
    const modalClose = document.querySelector("#modal-close");
    const modalImage = document.querySelector("#modal-image");
    const modalTitle = document.querySelector("#modal-title");
    const modalArtist = document.querySelector("#modal-artist");
    const modalCategory = document.querySelector("#modal-category");
    const modalPrice = document.querySelector("#modal-price");

    const artworkCards = Array.from(
        document.querySelectorAll(".artwork-card")
    );

    function filterArtwork() {
        const searchText = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value;

        let visibleArtworkCount = 0;

        artworkCards.forEach(function (card) {
            const title = card.dataset.title.toLowerCase();
            const artist = card.dataset.artist.toLowerCase();
            const category = card.dataset.category;

            const matchesSearch =
                title.includes(searchText) ||
                artist.includes(searchText);

            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.classList.remove("hidden");
                visibleArtworkCount++;
            } else {
                card.classList.add("hidden");
            }
        });

        resultsMessage.textContent =
            visibleArtworkCount === 1
                ? "1 artwork found."
                : `${visibleArtworkCount} artworks found.`;
    }

    function sortArtwork() {
        const sortValue = sortSelect.value;
        const sortedCards = [...artworkCards];

        if (sortValue === "title-ascending") {
            sortedCards.sort(function (firstCard, secondCard) {
                return firstCard.dataset.title.localeCompare(
                    secondCard.dataset.title
                );
            });
        }

        if (sortValue === "price-low-high") {
            sortedCards.sort(function (firstCard, secondCard) {
                return (
                    Number(firstCard.dataset.price) -
                    Number(secondCard.dataset.price)
                );
            });
        }

        if (sortValue === "price-high-low") {
            sortedCards.sort(function (firstCard, secondCard) {
                return (
                    Number(secondCard.dataset.price) -
                    Number(firstCard.dataset.price)
                );
            });
        }

        if (sortValue === "default") {
            sortedCards.sort(function (firstCard, secondCard) {
                return (
                    artworkCards.indexOf(firstCard) -
                    artworkCards.indexOf(secondCard)
                );
            });
        }

        sortedCards.forEach(function (card) {
            artworkGrid.appendChild(card);
        });
    }

    function openArtworkModal(card) {
        const image = card.querySelector("img");
        const priceText = card.querySelector(
            ".artwork-information p:last-of-type"
        ).textContent.replace("Price:", "").trim();

        modalImage.src = image.src;
        modalImage.alt = image.alt;
        modalTitle.textContent = card.dataset.title;
        modalArtist.textContent = card.dataset.artist;
        modalCategory.textContent = card.dataset.category;
        modalPrice.textContent = priceText;

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
    }

    function closeArtworkModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
    }

    searchInput.addEventListener("input", filterArtwork);
    categoryFilter.addEventListener("change", filterArtwork);
    sortSelect.addEventListener("change", sortArtwork);

    artworkCards.forEach(function (card) {
        const detailsButton = card.querySelector(".details-button");

        detailsButton.addEventListener("click", function () {
            openArtworkModal(card);
        });
    });

    modalClose.addEventListener("click", closeArtworkModal);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeArtworkModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeArtworkModal();
        }
    });

    filterArtwork();
}
const eventCards = document.querySelectorAll(".event-card");

if (eventCards.length > 0) {
    const eventModal = document.querySelector("#event-modal");
    const eventModalClose = document.querySelector("#event-modal-close");

    const eventModalImage = document.querySelector("#event-modal-image");
    const eventModalTitle = document.querySelector("#event-modal-title");
    const eventModalDate = document.querySelector("#event-modal-date");
    const eventModalLocation = document.querySelector(
        "#event-modal-location"
    );
    const eventModalDescription = document.querySelector(
        "#event-modal-description"
    );

    function openEventModal(card) {
        const image = card.querySelector("img");

        eventModalImage.src = image.src;
        eventModalImage.alt = image.alt;
        eventModalTitle.textContent = card.dataset.title;
        eventModalDate.textContent = card.dataset.date;
        eventModalLocation.textContent = card.dataset.location;
        eventModalDescription.textContent = card.dataset.description;

        eventModal.classList.add("open");
        eventModal.setAttribute("aria-hidden", "false");
    }

    function closeEventModal() {
        eventModal.classList.remove("open");
        eventModal.setAttribute("aria-hidden", "true");
    }

    eventCards.forEach(function (card) {
        const detailsButton = card.querySelector(
            ".event-details-button"
        );

        detailsButton.addEventListener("click", function () {
            openEventModal(card);
        });
    });

    eventModalClose.addEventListener("click", closeEventModal);

    eventModal.addEventListener("click", function (event) {
        if (event.target === eventModal) {
            closeEventModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            eventModal.classList.contains("open")
        ) {
            closeEventModal();
        }
    });
}