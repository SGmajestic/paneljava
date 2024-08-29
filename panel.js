<script>

const pricingMatrix = {
        individual: {
            '1year': {
                international: {
                    horizon: 474,
                    assist: 315
                },
                domestic: {
                    horizon: 364,
                    assist: 255
                }
            },
            '2year': {
                international: {
                    horizon: 843,
                    assist: 525
                },
                domestic: {
                    horizon: 636,
                    assist: 415
                }
            },
            '3year': {
                international: {
                    horizon: 1207,
                    assist: 730
                },
                domestic: {
                    horizon: 895,
                    assist: 510
                }
            },
            '5year': {
                international: {
                    horizon: 1945,
                    assist: 1150
                },
                domestic: {
                    horizon: 1460,
                    assist: 800
                }
            },

             '8day': {
                international: {
                    horizon: 189,
                    assist: 99
                },
                domestic: {
                    horizon: 1460,
                    assist: 800
                }
            },
            '15Day': {
                international: {
                    horizon: 245,
                    assist: 155
                },
                domestic: {
                    horizon: 1460,
                    assist: 800
                }
            },
            '21Day': {
                international: {
                    horizon: 290,
                    assist: 200
                },
                domestic: {
                    horizon: 1460,
                    assist: 800
                }
            },
             '30Day': {
                international: {
                    horizon: 345,
                    assist: 255
                },
                domestic: {
                    horizon: 1460,
                    assist: 800
                }
            }
        },
        family: {
            '1year': {
                international: {
                    horizon: 614,
                    assist: 425
                },
                domestic: {
                    horizon: 534,
                    assist: 370
                }
            },
            '2year': {
                international: {
                    horizon: 1173,
                    assist: 795
                },
                domestic: {
                    horizon: 845,
                    assist: 555
                }
            },
            '3year': {
                international: {
                    horizon: 1717,
                    assist: 1150
                },
                domestic: {
                    horizon: 1270,
                    assist: 845
                }
            },
            '5year': {
                international: {
                    horizon: 2725,
                    assist: 1780
                },
                domestic: {
                    horizon: 2030,
                    assist: 1200
                }
            },
            '8day': {
                international: {
                    horizon: 318,
                    assist: 198
                },
                domestic: {
                    horizon: 1270,
                    assist: 845
                }
            },
            '15Day': {
                international: {
                    horizon: 380,
                    assist: 260
                },
                domestic: {
                    horizon: 2030,
                    assist: 1200
                }
            },
             '21Day': {
                international: {
                    horizon: 455,
                    assist: 335
                },
                domestic: {
                    horizon: 1270,
                    assist: 845
                }
            },
            '30Day': {
                international: {
                    horizon: 515,
                    assist: 395
                },
                domestic: {
                    horizon: 2030,
                    assist: 1200
                }
            }

        }
    };

    // Toggle side panel visibility
    document.getElementById('togglePanelBtn').addEventListener('click', function () {
        document.getElementById('sidePanel').classList.add('open');
        document.getElementById('togglePanelBtn').style.opacity = '0';
    });

    document.getElementById('closeBtn').addEventListener('click', function () {
        document.getElementById('sidePanel').classList.remove('open');
        setTimeout(function () {
            document.getElementById('togglePanelBtn').style.opacity = '1';
        }, 300); // Delay to match the panel closing animation
    });

    // Show/hide specific options based on membership type selection
    document.getElementById('oneTrip').addEventListener('change', function () {
        document.querySelector('.one-trip-options').style.display = 'block';
        document.querySelector('.all-year-options').style.display = 'none';
        updateOptions();
    });

    document.getElementById('allYear').addEventListener('change', function () {
        document.querySelector('.all-year-options').style.display = 'block';
        document.querySelector('.one-trip-options').style.display = 'none';
        updateOptions();
    });

    // Update button states and calculate total
    function updateOptions() {
        toggleDomestic();
        disableShortTermForDomestic();
        disableLongTermForDomestic();
        calculateTotal();
    }

    // Toggle Domestic button
    function toggleDomestic() {
        const domesticButton = document.getElementById('domestic');
        const oneTripSelected = document.getElementById('oneTrip').checked;
        const fiveYearSelected = document.getElementById('5year')?.checked;
        const threeYearSelected = document.getElementById('3year')?.checked;
        const twoYearSelected = document.getElementById('2year')?.checked;

        domesticButton.disabled = oneTripSelected || fiveYearSelected || threeYearSelected || twoYearSelected;
        domesticButton.closest('label').classList.toggle('disabled-btn', domesticButton.disabled);
    }

    // Disable Short Term option if Domestic is selected
    function disableShortTermForDomestic() {
        const shortTermButton = document.getElementById('oneTrip');
        const domesticSelected = document.getElementById('domestic').checked;

        shortTermButton.disabled = domesticSelected;
        shortTermButton.closest('label').classList.toggle('disabled-btn', shortTermButton.disabled);
    }

    // Disable Long Term options if Domestic is selected
    function disableLongTermForDomestic() {
        const domesticSelected = document.getElementById('domestic').checked;
        const longTermButtons = ['2year', '3year', '5year'];

        longTermButtons.forEach(id => {
            const button = document.getElementById(id);
            if (button) {
                button.disabled = domesticSelected;
                button.closest('label').classList.toggle('disabled-btn', button.disabled);
            }
        });
    }

    // Attach change event listeners to relevant inputs
    document.querySelectorAll('input[name="type-options"], input[name="duration-options"], input[name="one-trip-options"], input[name="all-year-options"], input[name="destination-options"], input[name="protection-options"]').forEach(input => {
        input.addEventListener('change', updateOptions);
    });

    // Initial setup
    updateOptions();

    // Calculation function to update the total based on selections
    function calculateTotal() {
        let total = 0;

        // Get selected options
        const tripTypeInput = document.querySelector('input[name="type-options"]:checked');
        const durationOption = document.querySelector('input[name="duration-options"]:checked');
        const oneTripInput = document.querySelector('input[name="one-trip-options"]:checked');
        const allYearInput = document.querySelector('input[name="all-year-options"]:checked');
        const destinationInput = document.querySelector('input[name="destination-options"]:checked');
        const protectionInput = document.querySelector('input[name="protection-options"]:checked');

        // Ensure selections are made
        if (!tripTypeInput || !durationOption || (!oneTripInput && !allYearInput) || !destinationInput || !protectionInput) {
            console.log("Missing selections!");
            return;
        }

        // Define the key for pricing
        const tripType = tripTypeInput.id;
        const duration = durationOption.id === 'allYear' ? allYearInput?.id : oneTripInput?.id;
        const destination = destinationInput.id;
        const protection = protectionInput.id.replace('medjet', '').toLowerCase();

        console.log("Pricing Key:", tripType, duration, destination, protection); // Debugging key

        // Calculate total
        if (pricingMatrix[tripType] && pricingMatrix[tripType][duration] && pricingMatrix[tripType][duration][destination]) {
            total = pricingMatrix[tripType][duration][destination][protection] || 0;
        }

        console.log("Calculated Total:", total); // Debugging: Log the total
        document.getElementById('totalDisplay').innerText = 'Total: $' + total;
    }

</script>
