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
const artworkForm = document.querySelector("#artwork-form");

if (artworkForm) {
    const artistName = document.querySelector("#artist-name");
    const artistEmail = document.querySelector("#artist-email");
    const artworkTitle = document.querySelector("#artwork-title");
    const artworkCategory = document.querySelector(
        "#artwork-category"
    );
    const artworkPrice = document.querySelector("#artwork-price");
    const artworkDescription = document.querySelector(
        "#artwork-description"
    );

    const characterCount = document.querySelector(
        "#character-count"
    );
    const formStatus = document.querySelector("#form-status");

    function showError(field, message) {
        const errorElement = document.querySelector(
            `#${field.id}-error`
        );

        field.classList.add("invalid");
        field.classList.remove("valid");
        errorElement.textContent = message;
    }

    function showValid(field) {
        const errorElement = document.querySelector(
            `#${field.id}-error`
        );

        field.classList.remove("invalid");
        field.classList.add("valid");
        errorElement.textContent = "";
    }

    function validateRequiredText(field, fieldName) {
        const value = field.value.trim();

        if (value === "") {
            showError(field, `${fieldName} is required.`);
            return false;
        }

        if (value.length < 2) {
            showError(
                field,
                `${fieldName} must contain at least 2 characters.`
            );
            return false;
        }

        showValid(field);
        return true;
    }

    function validateEmail() {
        const emailValue = artistEmail.value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailValue === "") {
            showError(
                artistEmail,
                "Email address is required."
            );
            return false;
        }

        if (!emailPattern.test(emailValue)) {
            showError(
                artistEmail,
                "Enter a valid email address."
            );
            return false;
        }

        showValid(artistEmail);
        return true;
    }

    function validateCategory() {
        if (artworkCategory.value === "") {
            showError(
                artworkCategory,
                "Please select an artwork category."
            );
            return false;
        }

        showValid(artworkCategory);
        return true;
    }

    function validatePrice() {
        const priceValue = artworkPrice.value.trim();
        const numericPrice = Number(priceValue);

        if (priceValue === "") {
            showError(
                artworkPrice,
                "Price is required."
            );
            return false;
        }

        if (Number.isNaN(numericPrice)) {
            showError(
                artworkPrice,
                "Price must be a number."
            );
            return false;
        }

        if (numericPrice < 0) {
            showError(
                artworkPrice,
                "Price cannot be negative."
            );
            return false;
        }

        showValid(artworkPrice);
        return true;
    }

    function validateDescription() {
        const descriptionValue =
            artworkDescription.value.trim();

        if (descriptionValue === "") {
            showError(
                artworkDescription,
                "Artwork description is required."
            );
            return false;
        }

        if (descriptionValue.length < 20) {
            showError(
                artworkDescription,
                "Description must contain at least 20 characters."
            );
            return false;
        }

        if (descriptionValue.length > 500) {
            showError(
                artworkDescription,
                "Description cannot exceed 500 characters."
            );
            return false;
        }

        showValid(artworkDescription);
        return true;
    }

    function validateForm() {
        const nameIsValid = validateRequiredText(
            artistName,
            "Artist name"
        );

        const emailIsValid = validateEmail();

        const titleIsValid = validateRequiredText(
            artworkTitle,
            "Artwork title"
        );

        const categoryIsValid = validateCategory();
        const priceIsValid = validatePrice();
        const descriptionIsValid = validateDescription();

        return (
            nameIsValid &&
            emailIsValid &&
            titleIsValid &&
            categoryIsValid &&
            priceIsValid &&
            descriptionIsValid
        );
    }

    artistName.addEventListener("blur", function () {
        validateRequiredText(artistName, "Artist name");
    });

    artistEmail.addEventListener("blur", validateEmail);

    artworkTitle.addEventListener("blur", function () {
        validateRequiredText(
            artworkTitle,
            "Artwork title"
        );
    });

    artworkCategory.addEventListener(
        "change",
        validateCategory
    );

    artworkPrice.addEventListener("blur", validatePrice);

    artworkDescription.addEventListener(
        "input",
        function () {
            characterCount.textContent =
                `${artworkDescription.value.length} / 500`;
        }
    );

    artworkDescription.addEventListener(
        "blur",
        validateDescription
    );

    artworkForm.addEventListener("submit", function (event) {
        event.preventDefault();

        formStatus.className = "form-status";
        formStatus.textContent = "";

        if (validateForm()) {
            const submittedTitle =
                artworkTitle.value.trim();

            formStatus.classList.add("success");

            formStatus.textContent =
                `"${submittedTitle}" was validated successfully. ` +
                "This form is not connected to the backend yet.";

            artworkForm.reset();

            document
                .querySelectorAll(
                    "#artwork-form input, " +
                    "#artwork-form select, " +
                    "#artwork-form textarea"
                )
                .forEach(function (field) {
                    field.classList.remove(
                        "valid",
                        "invalid"
                    );
                });

            characterCount.textContent = "0 / 500";
        } else {
            formStatus.classList.add("failure");

            formStatus.textContent =
                "Please correct the highlighted fields.";

            const firstInvalidField =
                artworkForm.querySelector(".invalid");

            if (firstInvalidField) {
                firstInvalidField.focus();
            }
        }
    });

    artworkForm.addEventListener("reset", function () {
        window.setTimeout(function () {
            document
                .querySelectorAll(".error-message")
                .forEach(function (errorElement) {
                    errorElement.textContent = "";
                });

            document
                .querySelectorAll(
                    "#artwork-form input, " +
                    "#artwork-form select, " +
                    "#artwork-form textarea"
                )
                .forEach(function (field) {
                    field.classList.remove(
                        "valid",
                        "invalid"
                    );
                });

            formStatus.className = "form-status";
            formStatus.textContent = "";
            characterCount.textContent = "0 / 500";
        }, 0);
    });
}
const faqQuestions = document.querySelectorAll(".faq-question");

if (faqQuestions.length > 0) {
    faqQuestions.forEach(function (questionButton) {
        questionButton.addEventListener("click", function () {
            const answerId =
                questionButton.getAttribute("aria-controls");

            const answer = document.querySelector(`#${answerId}`);
            const icon = questionButton.querySelector(".faq-icon");

            const isExpanded =
                questionButton.getAttribute("aria-expanded") === "true";

            if (isExpanded) {
                questionButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                answer.hidden = true;
                icon.textContent = "+";
            } else {
                questionButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

                answer.hidden = false;
                icon.textContent = "−";
            }
        });
    });
}
