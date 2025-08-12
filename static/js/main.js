// Initialize dark mode
function initDarkMode() {
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        document.documentElement.classList.add("dark");
    }

    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (event) => {
            if (event.matches) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        });

    document.getElementById("theme-toggle").addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
    });
}

// You can update the UI with user data here register

// Simulated database (in-memory store)
const db = {
    users: [],
    events: [],
    /*,

                {
                    id: 2,
                    title: 'Summer Music Festival',
                    description: 'Experience an unforgettable day of music, featuring performances from top artists across multiple genres on multiple stages.',
                    date: '2023-07-20',
                    time: '12:00',
                    location: 'Central Park, New York',
                    category: 'concert',
                    image: '',
                    organizer: 'organizer',
                    organizerId: 2,
                    status: 'past',
                    createdAt: '2023-03-15',
                    ticketTypes: [
                        {
                            id: 4,
                            name: 'General Admission',
                            price: 75.00,
                            description: 'Standard festival entry',
                            capacity: 5000,
                            sold: 4250
                        },
                        {
                            id: 5,
                            name: 'VIP Pass',
                            price: 150.00,
                            description: 'VIP area access, complimentary food & drinks',
                            capacity: 500,
                            sold: 350
                        }
                    ]
                },
                {
                    id: 3,
                    title: 'Community Fundraiser',
                    description: 'Join our community fundraiser to support local causes. There will be food, entertainment, and activities for the whole family.',
                    date: '2024-11-05',
                    time: '15:00',
                    location: 'Community Center, Chicago',
                    category: 'community',
                    image: '',
                    organizer: 'admin',
                    organizerId: 1,
                    status: 'upcoming',
                    createdAt: '2023-09-01',
                    ticketTypes: [
                        {
                            id: 6,
                            name: 'Donation Entry',
                            price: 0,
                            description: 'Free entry with suggested donation at the door',
                            capacity: 200,
                            sold: 75
                        },
                        {
                            id: 7,
                            name: 'Supporter Ticket',
                            price: 25.00,
                            description: 'Entry with donation included and supporter badge',
                            capacity: 100,
                            sold: 45
                        }
                    ]
                },
                {
                    id: 4,
                    title: 'Business Workshop: Growth Strategies',
                    description: 'Learn proven strategies to scale your business from industry experts in this intensive half-day workshop.',
                    date: '2023-12-08',
                    time: '13:00',
                    location: 'Business Center, Los Angeles',
                    category: 'workshop',
                    image: '',
                    organizer: 'admin',
                    organizerId: 1,
                    status: 'upcoming',
                    createdAt: '2023-09-15',
                    ticketTypes: [
                        {
                            id: 8,
                            name: 'Professional',
                            price: 199.99,
                            description: 'Workshop access with networking lunch',
                            capacity: 50,
                            sold: 30
                        },
                        {
                            id: 9,
                            name: 'Student',
                            price: 49.99,
                            description: 'Discounted rate for students (ID required)',
                            capacity: 25,
                            sold: 15
                        }
                    ]
                },
                {
                    id: 5,
                    title: 'Basketball Championship Finals',
                    description: 'Witness the thrilling conclusion to this season basketball championship as the top teams battle for the title.',
                    date: '2023-11-30',
                    time: '19:30',
                    location: 'Metro Arena, Dallas',
                    category: 'sports',
                    image: '',
                    organizer: 'organizer',
                    organizerId: 2,
                    status: 'upcoming',
                    createdAt: '2023-08-20',
                    ticketTypes: [
                        {
                            id: 10,
                            name: 'Standard Seating',
                            price: 85.00,
                            description: 'Regular arena seating',
                            capacity: 10000,
                            sold: 8500
                        },
                        {
                            id: 11,
                            name: 'Premium Seating',
                            price: 150.00,
                            description: 'Lower level premium seating',
                            capacity: 5000,
                            sold: 3800
                        },
                        {
                            id: 12,
                            name: 'Courtside',
                            price: 500.00,
                            description: 'Exclusive courtside experience',
                            capacity: 100,
                            sold: 85
                        }
                    ]
                }
            ]*/ registrations: [
        /*
                    {
                        id: 1,
                        userId: 3,
                        eventId: 1,
                        ticketTypeId: 2,
                        name: 'Test User',
                        email: 'user@example.com',
                        ticketCode: 'TC2023-1001',
                        registrationDate: '2023-10-05',
                        paymentStatus: 'paid',
                        checkedIn: false
                    },
                    {
                        id: 2,
                        userId: 3,
                        eventId: 3,
                        ticketTypeId: 6,
                        name: 'Test User',
                        email: 'user@example.com',
                        ticketCode: 'TC2023-1002',
                        registrationDate: '2023-10-12',
                        paymentStatus: 'free',
                        checkedIn: false
                    }*/
    ],
    nextUserId: 4,
    nextEventId: 6,
    nextTicketTypeId: 13,
    nextRegistrationId: 3,
};

console.log(db.events);

async function getData() {
    try {
        const response = await fetch("/RoyalTix/api/eventItems/");
        const data = await response.json(); // Convert response to JSON format
        db.events.push(...data);
        // Return the fetched data

        //Double click this button to refress
        $("#all").click();
    } catch (error) {
        console.error("Error fetching data:", error);
        return []; // Return an empty array in case of error
    }
}
console.log(db.events);
async function getAttendees() {
    try {
        const response = await fetch("/RoyalTix/api/registerevent/");
        const data = await response.json(); // Convert response to JSON format
        db.registrations.push(...data);
        // Return the fetched data
    } catch (error) {
        console.error("Error fetching data:", error);
        return []; // Return an empty array in case of error
    }
}
// Fetch the data
getAttendees()
getData();
// Generate event images
db.events.forEach((event) => {
    event.image = generateEventImage(event.title, event.category);
});

// Current user state
let currentUser = null;
let currentPage = "events";
let selectedEvent = null;
let selectedTicketType = null;

// DOM Elements

const authPage = document.getElementById("auth-page");
const eventsPage = document.getElementById("events-page");
const profilePage = document.getElementById("profile-page");
const organizerPage = document.getElementById("organizer-page");
const adminPage = document.getElementById("admin-page");

const loginSection = document.getElementById("login-section");
const signupSection = document.getElementById("signup-section");

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

const authButtons = document.getElementById("auth-buttons");
const userMenu = document.getElementById("user-menu");
const userInitials = document.getElementById("user-initials");
const userMenuButton = document.getElementById("user-menu-button");
const userDropdown = document.getElementById("user-dropdown");

const loginButton = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");
const logoutButton = document.getElementById("logout-button");

const switchToSignup = document.getElementById("switch-to-signup");
const switchToLogin = document.getElementById("switch-to-login");

const eventsContainer = document.getElementById("events-container");

const eventModal = document.getElementById("event-modal");
const closeModal = document.getElementById("close-modal");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const eventId = document.getElementById("event-id");
const modalEventTitle = document.getElementById("modal-event-title");
const modalEventDescription = document.getElementById(
    "modal-event-description",
);
const modalEventCategory = document.getElementById("modal-event-category");
const modalEventDate = document.getElementById("modal-event-date");
const modalEventTime = document.getElementById("modal-event-time");
const modalEventLocation = document.getElementById("modal-event-location");
const modalEventDateBadge = document.getElementById("modal-event-date-badge");
const modalEventOrganizer = document.getElementById("modal-event-organizer");
const organizerInitial = document.getElementById("organizer-initial");

const ticketTypesContainer = document.getElementById("ticket-types-container");
const ticketSelection = document.getElementById("ticket-selection");

const loginRequiredMessage = document.getElementById("login-required-message");
const registrationForm = document.getElementById("registration-form");
const paymentSection = document.getElementById("payment-section");
const registrationSuccess = document.getElementById("registration-success");
const registrationLoading = document.getElementById("registration-loading");
const successMessage = document.getElementById("success-message");
const ticketQrCode = document.getElementById("ticket-qr-code");

const summaryTicketType = document.getElementById("summary-ticket-type");
const summaryTicketPrice = document.getElementById("summary-ticket-price");
const summaryTotalPrice = document.getElementById("summary-total-price");

const profileInitials = document.getElementById("profile-initials");
const profileUsername = document.getElementById("profile-username");
const profileEmail = document.getElementById("profile-email");
const userTicketsContainer = document.getElementById("user-tickets-container");
const noTicketsMessage = document.getElementById("no-tickets-message");

const eventSearch = document.getElementById("event-search");
const categoryFilter = document.getElementById("category-filter");
const dateFilter = document.getElementById("date-filter");
const priceFilter = document.getElementById("price-filter");
const categoryPills = document.querySelectorAll(".category-pill");
const noEventsFound = document.getElementById("no-events-found");

// Organizer elements
const createEventForm = document.getElementById("create-event-form");
const eventForm = document.getElementById("event-form");
const createEventBtn = document.getElementById("create-event-btn");
const cancelEventBtn = document.getElementById("cancel-event-btn");
const manageEventsBtn = document.getElementById("manage-events-btn");
const viewAnalyticsBtn = document.getElementById("view-analytics-btn");
const manageEvents = document.getElementById("manage-events");
const organizerEventsTable = document.getElementById("organizer-events-table");
const noOrganizerEvents = document.getElementById("no-organizer-events");
const eventAttendees = document.getElementById("event-attendees");
const attendeesEventTitle = document.getElementById("attendees-event-title");
const attendeesTable = document.getElementById("attendees-table");
const noAttendees = document.getElementById("no-attendees");
const backToManage = document.getElementById("back-to-manage");
const analyticsDashboard = document.getElementById("analytics-dashboard");
const ticketTypesForm = document.getElementById("ticket-types-form");
const addTicketType = document.getElementById("add-ticket-type");
const userid = document.getElementById("userid");
const user = document.getElementById("user");
// Admin elements
const adminUsersBtn = document.getElementById("admin-users-btn");
const adminEventsBtn = document.getElementById("admin-events-btn");
const adminStatsBtn = document.getElementById("admin-stats-btn");
const adminUsers = document.getElementById("admin-users");
const adminAllEvents = document.getElementById("admin-all-events");
const adminStatistics = document.getElementById("admin-statistics");
// Toast
const toast = document.getElementById("toast");
const toastTitle = document.getElementById("toast-title");
const toastMessage = document.getElementById("toast-message");
const toastIcon = document.getElementById("toast-icon");
const toastIconSymbol = document.getElementById("toast-icon-symbol");
const closeToast = document.getElementById("close-toast");

const navLinks = document.querySelectorAll(".nav-link");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
const mobileMenu = document.getElementById("mobile-menu");

const mobileMenuButton = document.querySelector(".mobile-menu-button");
const modalLogin = document.getElementById("login-section");
const modalSignup = document.getElementById("signup-section");
// Generate random image for events using canvas


//
console.log(user);
if (user && user.innerHTML) { // Check if user is not null and has innerHTML
    const real_user = user.innerHTML;
    const initials = real_user.substring(0, 2).toUpperCase();
    userInitials.textContent = initials;
} else {
    const real_user = ''; // Handle the case where user or innerHTML is null/empty
    const initials = real_user.substring(0, 2).toUpperCase();
    userInitials.textContent = initials;
}
function generateEventImage(eventName, category) {
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");

    // Different color schemes based on category
    let colors;
    switch (category) {
        case "conference":
            colors = [
                [25, 118, 210], // Blue
                [13, 71, 161], // Dark Blue
            ];
            break;
        case "concert":
            colors = [
                [156, 39, 176], // Purple
                [74, 20, 140], // Dark Purple
            ];
            break;
        case "workshop":
            colors = [
                [0, 150, 136], // Teal
                [0, 77, 64], // Dark Teal
            ];
            break;
        case "sports":
            colors = [
                [244, 67, 54], // Red
                [183, 28, 28], // Dark Red
            ];
            break;
        case "community":
            colors = [
                [76, 175, 80], // Green
                [27, 94, 32], // Dark Green
            ];
            break;
        default:
            colors = [
                [
                    Math.floor(Math.random() * 120) + 50,
                    Math.floor(Math.random() * 120) + 50,
                    Math.floor(Math.random() * 120) + 50,
                ],
                [
                    Math.floor(Math.random() * 60),
                    Math.floor(Math.random() * 60),
                    Math.floor(Math.random() * 60),
                ],
            ];
    }

    // Create gradient background
    const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height,
    );
    gradient.addColorStop(
        0,
        `rgb(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]})`,
    );
    gradient.addColorStop(
        1,
        `rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]})`,
    );

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add pattern based on category
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";

    if (category === "conference") {
        // Grid pattern for conference
        for (let x = 0; x < canvas.width; x += 30) {
            for (let y = 0; y < canvas.height; y += 30) {
                ctx.fillRect(x, y, 2, 2);
            }
        }
    } else if (category === "concert") {
        // Sound wave pattern for concert
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * canvas.width;
            const height = Math.random() * 100 + 50;
            ctx.fillRect(x, (canvas.height - height) / 2, 5, height);
        }
    } else if (category === "sports") {
        // Ball pattern for sports
        for (let i = 0; i < 8; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 15 + 5;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    } else {
        // Default pattern
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 50 + 20;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Add category icon
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.font = "30px FontAwesome, Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    let icon = "";
    switch (category) {
        case "conference":
            icon = "";
            break; // Use appropriate icon code
        case "concert":
            icon = "";
            break;
        case "workshop":
            icon = "";
            break;
        case "sports":
            icon = "";
            break;
        case "community":
            icon = "";
            break;
        default:
            icon = "";
            break;
    }

    ctx.fillText(icon, 20, 20);

    // Add event name
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "bold 36px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Split text into lines if too long
    const words = eventName.split(" ");
    let line = "";
    const lines = [];
    const maxWidth = canvas.width - 60;

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
            lines.push(line);
            line = words[i] + " ";
        } else {
            line = testLine;
        }
    }
    lines.push(line);

    const lineHeight = 45;
    const yStart = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;

    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], canvas.width / 2, yStart + i * lineHeight);
    }

    // Add RoyalTik label
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "16px Inter, sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    ctx.fillText("RoyalTik", canvas.width - 20, canvas.height - 20);

    return canvas.toDataURL("image/png");
}

// Initialize the application
function initApp() {
    initDarkMode();
    // Check if user is logged in (we'd use localStorage or cookies in a real app)
    // For demo purposes, we'll start logged out
    //updateAuthUI();

    // Set initial page
    // showPage('events');

    // Add event listeners
    setupEventListeners();

    // Generate demo chart data (after page is loaded)
    setTimeout(() => {
        initCharts();
    }, 1000);
}
/*
            // Navigation
            function showPage(pageName) {
                // Hide all pages
                authPage.classList.add('hidden');
                eventsPage.classList.add('hidden');
                profilePage.classList.add('hidden');
                organizerPage.classList.add('hidden');
                adminPage.classList.add('hidden');

                // Show selected page
                currentPage = pageName;

                switch (pageName) {
                    case 'auth':
                        authPage.classList.remove('hidden');
                        break;
                    case 'events':
                        eventsPage.classList.remove('hidden');
                        renderEvents();
                        break;
                    case 'profile':
                        if (!currentUser) {
                            showPage('auth');
                            showToast('error', 'Authentication Required', 'Please log in to view your tickets.');
                            return;
                        }
                        profilePage.classList.remove('hidden');
                        renderUserProfile();
                        break;
                    case 'organizer':
                        if (!currentUser || !currentUser.isOrganizer) {
                            showPage('events');
                            showToast('error', 'Access Denied', 'You do not have permission to access the organizer dashboard.');
                            return;
                        }
                        organizerPage.classList.remove('hidden');
                        // Hide sub-sections except main dashboard
                        createEventForm.classList.add('hidden');
                        manageEvents.classList.add('hidden');
                        eventAttendees.classList.add('hidden');
                        analyticsDashboard.classList.add('hidden');
                        renderOrganizerEvents();
                        break;
                    case 'admin':
                        if (!currentUser || !currentUser.isAdmin) {
                            showPage('events');
                            showToast('error', 'Access Denied', 'You do not have permission to access the admin area.');
                            return;
                        }
                        adminPage.classList.remove('hidden');
                        // Hide sub-sections except main dashboard
                        adminUsers.classList.add('hidden');
                        adminAllEvents.classList.add('hidden');
                        adminStatistics.classList.add('hidden');
                        break;
                }

                // Highlight active nav link
                navLinks.forEach(link => {
                    if (link.dataset.page === pageName) {
                        link.classList.add('text-primary', 'font-semibold');
                    } else {
                        link.classList.remove('text-primary', 'font-semibold');
                    }
                });

                mobileNavLinks.forEach(link => {
                    if (link.dataset.page === pageName) {
                        link.classList.add('text-primary', 'font-semibold');
                    } else {
                        link.classList.remove('text-primary', 'font-semibold');
                    }
                });

                // Close mobile menu if open
                mobileMenu.classList.add('hidden');
            }
*/
// Authentication functions
/* function login(email, password) {
                 const user = db.users.find(u => u.email === email && u.password === password);
                 
                 if (user) {
                     currentUser = { ...user };
                     delete currentUser.password; // Don't keep password in memory
                     
                     updateAuthUI();
                     showPage('events');
                     showToast('success', 'Login Successful', 'Welcome back, ' + user.username + '!');
                     return true;
                 }
                 
                 return false;
             }
             */

/*
            async function getUserInfo() {
                const accessToken = localStorage.getItem('access_token'); // Retrieve stored JWT token

                if (!accessToken) {
                    console.error("No token found. User might be logged out.");
                    return null; // Return null if no token is found
                }

                try {
                    const response = await fetch('http://127.0.0.1:8000/event/api/userinfo/', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`, // Include JWT token in request
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch user info');
                    }

                    const userData = await response.json();
                    console.log("User Info:", userData); // Output user info to console
                    // Store token securely

                    const username = userData['username'];

                    if (username === 'best@example.com') {
                        userData['isAdmin'] = true;
                        userData['isOrganizer'] = true;
                    } else {
                        userData['isAdmin'] = false;
                        userData['isOrganizer'] = true;
                    }

                    db.users.push(userData);


                    currentUser = { ...userData };
                    console.log(db.users);// Extract user info
                    delete currentUser.password; // Remove sensitive data

                    updateAuthUI();
                    showPage('events');
                    showToast('success', 'Login Successful', 'Welcome back, ' + currentUser.username + '!');
                    return userData;
                } catch (error) {
                    console.error("Error fetching user info:", error);
                    return null;
                }
            }




            ///
            async function login(email, password) {
                const userData = {
                    username: email,

                    password: password
                };
                try {
                    const response = await fetch('http://127.0.0.1:8000/event/api/login/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    });

                    if (!response.ok) {
                        throw new Error('Login failed');
                    }

                    const data = await response.json(); // Assuming API returns token and user info

                    // Extract JWT token

                    if (data) {
                        localStorage.setItem('access_token', data.access); // Store the token
                        localStorage.setItem('refresh_token', data.refresh);
                        console.log(data); // Handle success data
                        console.log(data.refresh);
                        console.log(data.access);
                        getUserInfo();


                        return true;
                    }
                } catch (error) {
                    console.error('Login error:', error);
                    showToast('error', 'Login Failed', 'Invalid credentials or server issue.');
                    return false;
                }
            }


            /*
                    function signup(username, email, password, isOrganizer) {
                        // Check if email already exists
                        if (db.users.some(u => u.email === email)) {
                            return false;
                        }
                        
                        // Create new user
                        const newUser = {
                            id: db.nextUserId++,
                            username,
                            email,
                            password,
                            isAdmin: false,
                            isOrganizer: isOrganizer,
                            createdAt: new Date().toISOString().split('T')[0]
                        };
                        
                        db.users.push(newUser);
                        
                        // Log in the new user
                        currentUser = { ...newUser };
                        delete currentUser.password; // Don't keep password in memory
                        
                        updateAuthUI();
                        showPage('events');
                        showToast('success', 'Account Created', 'Welcome to RoyalTik, ' + username + '!');
                        return true;
                    }
                  *

            async function signup(username, email, password, isOrganizer) {
                const userData = {
                    'username': email,
                    'email': email,
                    'password': password


                };
                try {
                    const response = await fetch('http://127.0.0.1:8000/event/api/signup/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    });

                    if (!response.ok) {
                        throw new Error('Signup failed');
                    }

                    const data = await response.json(); // Assume API returns user data & JWT token

                    if (data) {
                        localStorage.setItem('access_token', data.access); // Store the token
                        localStorage.setItem('refresh_token', data.refresh);
                        console.log(data); // Handle success data
                        console.log(data.refresh);
                        console.log(data.access); // Store JWT token
                        //getUserInfo();
                        return true;
                    }
                } catch (error) {
                    console.error('Signup error:', error);
                    showToast('error', 'Signup Failed', 'Could not create an account.');
                    return false;
                }
            }


            getUserInfo().then(() => {
                // Now, myArray contains the fetched data and you can use it outside the function
                console.log("Using myArray outside function:", currentUser);
            });
            function logout() {
                currentUser = null;
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                console.log('Logged out successfully');
                updateAuthUI();
                showPage('events');
                showToast('success', 'Logged Out', 'You have been successfully logged out.');
            }

            function updateAuthUI() {
                const adminLink = document.getElementById('admin-link');
                const mobileAdminLink = document.getElementById('mobile-admin-link');
                const organizerLink = document.getElementById('organizer-link');
                const mobileOrganizerLink = document.getElementById('mobile-organizer-link');
                const profileLink = document.getElementById('profile-link');
                const mobileProfileLink = document.getElementById('mobile-profile-link');
                const organizerDropdown = document.getElementById('organizer-dropdown');
                const adminDropdown = document.getElementById('admin-dropdown');

                if (currentUser) {
                    // User is logged in
                    authButtons.classList.add('hidden');
                    userMenu.classList.remove('hidden');

                    // Set user initials
                    const initials = currentUser.username.substring(0, 2).toUpperCase();
                    userInitials.textContent = initials;

                    // Show/hide admin link
                    if (currentUser.isAdmin) {
                        adminLink.classList.remove('hidden');
                        mobileAdminLink.classList.remove('hidden');
                        adminDropdown.classList.remove('hidden');
                    } else {
                        adminLink.classList.add('hidden');
                        mobileAdminLink.classList.add('hidden');
                        adminDropdown.classList.add('hidden');
                    }

                    // Show/hide organizer link
                    if (currentUser.isOrganizer) {
                        organizerLink.classList.remove('hidden');
                        mobileOrganizerLink.classList.remove('hidden');
                        organizerDropdown.classList.remove('hidden');
                    } else {
                        organizerLink.classList.add('hidden');
                        mobileOrganizerLink.classList.add('hidden');
                        organizerDropdown.classList.add('hidden');
                    }

                    profileLink.classList.remove('hidden');
                    mobileProfileLink.classList.remove('hidden');
                } else {
                    // User is logged out
                    authButtons.classList.remove('hidden');
                    userMenu.classList.add('hidden');

                    adminLink.classList.add('hidden');
                    mobileAdminLink.classList.add('hidden');
                    organizerLink.classList.add('hidden');
                    mobileOrganizerLink.classList.add('hidden');
                    profileLink.classList.add('hidden');
                    mobileProfileLink.classList.add('hidden');
                }
            }*/

// Events rendering and filtering
function renderEvents() {
    // Get filters
    const searchTerm = eventSearch.value.toLowerCase();
    const categoryValue = categoryFilter.value;
    const dateValue = dateFilter.value;
    const priceValue = priceFilter.value;

    // Filter events
    let filteredEvents = db.events.filter((event) => {
        // Search term filter
        if (
            searchTerm &&
            !event.title.toLowerCase().includes(searchTerm) &&
            !event.description.toLowerCase().includes(searchTerm) &&
            !event.location.toLowerCase().includes(searchTerm)
        ) {
            return false;
        }

        // Category filter
        if (categoryValue && event.category !== categoryValue) {
            return false;
        }

        // Date filter
        if (dateValue) {
            const eventDate = new Date(event.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            const weekEnd = new Date(today);
            weekEnd.setDate(weekEnd.getDate() + 7);

            const monthEnd = new Date(today);
            monthEnd.setMonth(monthEnd.getMonth() + 1);

            if (
                dateValue === "today" &&
                eventDate.toDateString() !== today.toDateString()
            ) {
                return false;
            } else if (
                dateValue === "tomorrow" &&
                eventDate.toDateString() !== tomorrow.toDateString()
            ) {
                return false;
            } else if (
                dateValue === "week" &&
                (eventDate < today || eventDate >= weekEnd)
            ) {
                return false;
            } else if (
                dateValue === "month" &&
                (eventDate < today || eventDate >= monthEnd)
            ) {
                return false;
            }
        }

        // Price filter
        if (priceValue) {
            const hasFreeTier = event.ticketTypes.some(
                (type) => type.price === 0,
            );
            const minPrice = Math.min(
                ...event.ticketTypes.map((type) => type.price),
            );

            if (priceValue === "free" && !hasFreeTier) {
                return false;
            } else if (
                priceValue === "paid" &&
                hasFreeTier &&
                event.ticketTypes.length === 1
            ) {
                return false;
            } else if (priceValue === "low" && minPrice >= 25) {
                return false;
            } else if (
                priceValue === "mid" &&
                (minPrice < 25 || minPrice >= 100)
            ) {
                return false;
            } else if (priceValue === "high" && minPrice < 100) {
                return false;
            }
        }

        return true;
    });

    // Highlight active category pill
    categoryPills.forEach((pill) => {
        const pillCategory = pill.dataset.category;

        if (
            (pillCategory === "all" && !categoryValue) ||
            (pillCategory !== "all" && pillCategory === categoryValue)
        ) {
            pill.classList.add("bg-primary", "text-white");
            pill.classList.remove("bg-gray-100", "dark:bg-gray-700");
        } else {
            pill.classList.remove("bg-primary", "text-white");
            pill.classList.add("bg-gray-100", "dark:bg-gray-700");
        }
    });

    // Show/hide no results message
    if (filteredEvents.length === 0) {
        eventsContainer.innerHTML = "";
        noEventsFound.classList.remove("hidden");
    } else {
        noEventsFound.classList.add("hidden");
        eventsContainer.innerHTML = "";

        filteredEvents.forEach((event) => {
            const eventCard = document.createElement("div");
            eventCard.className =
                "bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300";

            // Check if user is already registered
            const isRegistered =
                currentUser &&
                db.registrations.some(
                    (reg) =>
                        reg.userId === currentUser.id &&
                        reg.eventId === event.id,
                );

            // Get minimum ticket price
            const minPrice = Math.min(
                ...event.ticketTypes.map((type) => type.price),
            );
            const hasFreeTier = event.ticketTypes.some(
                (type) => type.price === 0,
            );

            // Format date and check if event is past
            const eventDate = new Date(event.date);
            const isPastEvent = eventDate < new Date();

            // Calculate total tickets sold and capacity

            const totalSold = event.ticketTypes.reduce(
                (sum, type) => sum + type.sold,
                0,
            );
            const totalCapacity = event.ticketTypes.reduce(
                (sum, type) => sum + type.capacity,
                0,
            );

            const soldOutPercent = Math.round(
                (totalSold / totalCapacity) * 100,
            );
            const isSoldOut = totalSold >= totalCapacity;

            // Format category name
            const categoryName =
                event.category.charAt(0).toUpperCase() +
                event.category.slice(1);

            eventCard.innerHTML = `
                        <div class="relative">
                            <img src="${event.image}" alt="${event.title}" class="w-full h-48 object-cover">
                            <div class="absolute top-3 left-3 flex flex-wrap gap-2">
                                <span class="inline-block px-2 py-1 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 rounded-full text-xs font-medium text-primary dark:text-primary">
                                    ${categoryName}
                                </span>
                                ${
                                    isPastEvent
                                        ? `<span class="inline-block px-2 py-1 bg-gray-700 bg-opacity-80 rounded-full text-xs font-medium text-white">
                                        Past Event
                                    </span>`
                                        : isSoldOut
                                          ? `<span class="inline-block px-2 py-1 bg-red-600 bg-opacity-80 rounded-full text-xs font-medium text-white">
                                        Sold Out
                                    </span>`
                                          : soldOutPercent > 75
                                            ? `<span class="inline-block px-2 py-1 bg-orange-500 bg-opacity-80 rounded-full text-xs font-medium text-white">
                                        Selling Fast
                                    </span>`
                                            : ""
                                }
                            </div>
                        </div>
                        <div class="p-4">
                            <h3 class="text-xl font-bold mb-2">${event.title}</h3>
                            <div class="flex flex-col sm:flex-row gap-1 sm:gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                                <div class="flex items-center">
                                    <i class="far fa-calendar-alt mr-1 w-4 text-center"></i>
                                    <span>${formatDate(event.date)}</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-map-marker-alt mr-1 w-4 text-center"></i>
                                    <span class="truncate">${event.location.split(",")[0]}</span>
                                </div>
                            </div>
                            <p class="text-gray-600 dark:text-gray-400 mb-4">${event.description.length > 100 ? event.description.substring(0, 100) + "..." : event.description}</p>
                            <div class="flex justify-between items-center">
                                <span class="font-semibold">${hasFreeTier ? (minPrice > 0 ? `From $${minPrice.toFixed(2)}` : "Free") : `$${minPrice.toFixed(2)}`}</span>
                                <button class="event-btn ${isRegistered ? "bg-green-500 hover:bg-green-600" : isPastEvent ? "bg-gray-500 cursor-not-allowed" : isSoldOut ? "bg-gray-500 cursor-not-allowed" : "bg-primary hover:bg-primary-dark"} text-white font-medium py-2 px-4 rounded transition duration-300" data-event-id="${event.id}" ${isPastEvent || isSoldOut ? "disabled" : ""}>
                                    ${isRegistered ? '<i class="fas fa-check mr-2"></i>Registered' : isPastEvent ? "Past Event" : isSoldOut ? "Sold Out" : "Get Tickets"}
                                </button>
                            </div>
                        </div>
                    `;

            eventsContainer.appendChild(eventCard);

            // Add event listener to button
            const eventBtn = eventCard.querySelector(".event-btn");
            if (!eventBtn.disabled) {
                eventBtn.addEventListener("click", () => {
                    if (!isRegistered) {
                        openEventModal(event);
                    } else {
                        showToast(
                            "info",
                            "Already Registered",
                            "You are already registered for this event.",
                        );
                        // Option to view ticket
                        setTimeout(() => {
                            showPage("profile");
                        }, 1500);
                    }
                });
            }
        });
    }
}

// Open event registration modal
function openEventModal(event) {
    selectedEvent = event;
    selectedTicketType = null;

    // Set modal content
    eventId.textContent = event.id;
    modalTitle.textContent = "Event Details";
    modalImage.src = event.image;
    modalEventTitle.textContent = event.title;
    modalEventDescription.textContent = event.description;
    modalEventCategory.textContent =
        event.category.charAt(0).toUpperCase() + event.category.slice(1);
    modalEventDate.textContent = formatDate(event.date);
    modalEventTime.textContent = formatTime(event.time);
    modalEventLocation.textContent = event.location;

    // Date badge
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (eventDate.toDateString() === today.toDateString()) {
        modalEventDateBadge.textContent = "Today";
        modalEventDateBadge.className =
            "inline-block px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium";
    } else if (eventDate < today) {
        modalEventDateBadge.textContent = "Past Event";
        modalEventDateBadge.className =
            "inline-block px-3 py-1 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full text-sm font-medium";
    } else {
        const daysUntil = Math.ceil(
            (eventDate - today) / (1000 * 60 * 60 * 24),
        );
        if (daysUntil === 1) {
            modalEventDateBadge.textContent = "Tomorrow";
            modalEventDateBadge.className =
                "inline-block px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium";
        } else if (daysUntil <= 7) {
            modalEventDateBadge.textContent = `In ${daysUntil} days`;
            modalEventDateBadge.className =
                "inline-block px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium";
        } else {
            modalEventDateBadge.textContent = formatDate(event.date, true);
            modalEventDateBadge.className =
                "inline-block px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full text-sm font-medium";
        }
    }

    // Organizer info
    const organizer = db.users.find((u) => u.id === event.organizerId);
    if (organizer) {
        modalEventOrganizer.textContent = organizer.username;
        organizerInitial.textContent = organizer.username
            .substring(0, 1)
            .toUpperCase();
    }
    // Render ticket types
    renderTicketTypes(event);
    // Show appropriate form/message based on login status
    if (currentUser) {
        loginRequiredMessage.classList.remove("hidden");
        ticketSelection.classList.add("hidden");

        // Hide registration form until ticket is selected
        registrationForm.classList.add("hidden");
    } else {
        loginRequiredMessage.classList.add("hidden");
        ticketSelection.classList.remove("hidden");
        registrationForm.classList.remove("hidden");
    }

    // Hide success message
    registrationSuccess.classList.add("hidden");
    registrationLoading.classList.add("hidden");

    // Show modal
    eventModal.classList.remove("hidden");
}

// Render ticket types for the event
function renderTicketTypes(event) {
    ticketTypesContainer.innerHTML = "";

    event.ticketTypes.forEach((ticketType) => {
        const remainingTickets = ticketType.capacity - ticketType.sold;
        const isSoldOut = remainingTickets <= 0;

        const ticketCard = document.createElement("div");
        ticketCard.className = `ticket-type-card border rounded-lg p-4 ${isSoldOut ? "bg-gray-100 dark:bg-gray-700 opacity-60" : ""}`;
        ticketCard.dataset.ticketId = ticketType.id;

        ticketCard.innerHTML = `
                    <div class="flex justify-between items-start">
                        <div>
                            <h5 class="font-semibold">${ticketType.name}</h5>
                            <p class="text-sm text-gray-600 dark:text-gray-400">${ticketType.description || ""}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-lg">${ticketType.price > 0 ? "$" + ticketType.price.toFixed(2) : "Free"}</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                ${isSoldOut ? "Sold Out" : remainingTickets < 10 ? `Only ${remainingTickets} left` : `${remainingTickets} available`}
                            </p>
                        </div>
                    </div>
                    ${
                        !isSoldOut
                            ? `
                    <div class="mt-3 text-right">
                        <button class="select-ticket-btn px-4 py-1 bg-primary text-white rounded hover:bg-primary-dark transition-colors">
                            Select
                        </button>
                    </div>`
                            : ""
                    }
                `;

        ticketTypesContainer.appendChild(ticketCard);

        if (!isSoldOut) {
            const selectBtn = ticketCard.querySelector(".select-ticket-btn");
            selectBtn.addEventListener("click", () => {
                selectTicketType(ticketType);
            });
        }
    });
}

// Select a ticket type
function selectTicketType(ticketType) {
    selectedTicketType = ticketType;

    // Highlight selected ticket
    document.querySelectorAll(".ticket-type-card").forEach((card) => {
        if (parseInt(card.dataset.ticketId) === ticketType.id) {
            card.classList.add("selected");
        } else {
            card.classList.remove("selected");
        }
    });

    // Show registration form
    registrationForm.classList.remove("hidden");
    //Fields i need

    const cardNumber = document.getElementById("card-number");
    const cardExpiry = document.getElementById("card-expiry");
    const cardCvc = document.getElementById("card-cvc");
    // Update order summary
    summaryTicketType.textContent = ticketType.name;
    summaryTicketPrice.textContent =
        ticketType.price > 0 ? "$" + ticketType.price.toFixed(2) : "Free";
    summaryTotalPrice.textContent =
        ticketType.price > 0 ? "$" + ticketType.price.toFixed(2) : "Free";

    // Show/hide payment section based on ticket price
    if (ticketType.price > 0) {
        paymentSection.classList.remove("hidden");
        cardNumber.setAttribute("required", "true");
        cardExpiry.setAttribute("required", "true");
        cardCvc.setAttribute("required", "true");
    } else {
        paymentSection.classList.add("hidden");
        cardNumber.removeAttribute("required");
        cardExpiry.removeAttribute("required");
        cardCvc.removeAttribute("required");
    }

    // Pre-fill form with user data

    //payment-section             // Scroll to registration form
    registrationForm.scrollIntoView({ behavior: "smooth" });
}
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1),
                );
                break;
            }
        }
    }
    return cookieValue;
}

// Register for event
function registerForEvent(event, ticketType, formData) {
    // Show loading state
    registrationForm.classList.add("hidden");
    ticketSelection.classList.add("hidden");
    registrationLoading.classList.remove("hidden");
    const csrftoken = getCookie("csrftoken");
    eventId.textContent = event.id;
    const ticketCode = `RT-${event.id}-${ticketType.id}-${Math.floor(Math.random() * 10000)}`;

    const data = {
        name: formData.name,
        email: formData.email,
        ticket_code: ticketCode,
        payment_status: ticketType.price > 0 ? "paid" : "free",
        checked_in: false,
        event: event.id,
        ticket_type: ticketType.id,
    };
    const apiUrl = "/RoyalTix/api/registerevent/";

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify(data),
    };

    fetch(apiUrl, fetchOptions)
        .then((response) => {
            if (!response.ok) {
                console.error("HTTP error! Status:", response.status);
                return response.json().then((errorData) => {
                    console.error("Error data:", errorData);
                    showToast(
            "error",
            "Event Unsuccessfully  Registered",
            "Could not create the event.",
        );
                    throw new Error(
                        "Request failed with status " +
                            response.status +
                            " and details: " +
                            JSON.stringify(errorData),
                    );
                });
            }
            return response.json();
        })
        .then((responseData) => {
            console.log("Success:", responseData);
            showToast(
            "success",
            "Event successfully  Registered",
            "Could not create the event.",
        );
            registrationLoading.classList.add("hidden");
            registrationSuccess.classList.remove("hidden");

            successMessage.textContent = `You have successfully registered for ${event.title}!`;
        })
        .catch((error) => {
            console.error("Fetch error:", error);
            alert("An error occurred: " + error.message);
        });
    /*
                // Simulate server request delay
                setTimeout(() => {
                    // Generate ticket code
                    const ticketCode = `RT-${event.id}-${ticketType.id}-${Math.floor(Math.random() * 10000)}`;

                    // Create registration
                    const registration = {
                        id: db.nextRegistrationId++,
                        userId: currentUser.id,
                        eventId: event.id,
                        ticketTypeId: ticketType.id,
                        name: formData.get('name'),
                        email: formData.get('email'),
                        ticketCode: ticketCode,
                        registrationDate: new Date().toISOString().split('T')[0],
                        paymentStatus: ticketType.price > 0 ? 'paid' : 'free',
                        checkedIn: false
                    };

                    db.registrations.push(registration);

                    // Update ticket sold count
                    const eventToUpdate = db.events.find(e => e.id === event.id);
                    const ticketTypeToUpdate = eventToUpdate.ticketTypes.find(t => t.id === ticketType.id);
                    ticketTypeToUpdate.sold += 1;

                    // Generate QR code
                    ticketQrCode.innerHTML = '';
                    QRCode.toCanvas(ticketQrCode, ticketCode, {
                        width: 200,
                        margin: 2,
                        color: {
                            dark: '#5D5CDE',
                            light: '#ffffff'
                        }
                    }, function (error) {
                        if (error) console.error(error);
                    });

                    // Show success message
                    registrationLoading.classList.add('hidden');
                    registrationSuccess.classList.remove('hidden');

                    successMessage.textContent = `You have successfully registered for ${event.title}!`;

                    // Update events display
                    renderEvents();
                }, 1500);
                */
}

// User profile & tickets
function renderUserProfile() {
    if (!currentUser) return;

    // Set user details
    profileInitials.textContent = currentUser.username
        .substring(0, 2)
        .toUpperCase();
    profileUsername.textContent = currentUser.username;
    profileEmail.textContent = currentUser.email;

    // Get user's registered events
    const userRegistrations = db.registrations.filter(
        (reg) => reg.userId === currentUser.id,
    );

    // Clear previous events
    userTicketsContainer.innerHTML = "";

    if (userRegistrations.length === 0) {
        noTicketsMessage.classList.remove("hidden");
    } else {
        noTicketsMessage.classList.add("hidden");

        userRegistrations.forEach((registration) => {
            const event = db.events.find((e) => e.id === registration.eventId);

            if (event) {
                const ticketType = event.ticketTypes.find(
                    (t) => t.id === registration.ticketTypeId,
                );
                const eventDate = new Date(event.date);
                const isPastEvent = eventDate < new Date();

                const ticketCard = document.createElement("div");
                ticketCard.className =
                    "bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700";

                ticketCard.innerHTML = `
                            <div class="p-4 ${isPastEvent ? "bg-gray-100 dark:bg-gray-700" : "bg-primary bg-opacity-10 dark:bg-opacity-20"}">
                                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                    <div>
                                        <h4 class="text-lg font-semibold">${event.title}</h4>
                                        <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <i class="far fa-calendar-alt mr-2"></i> ${formatDate(event.date)}
                                            <span class="mx-2">•</span>
                                            <i class="far fa-clock mr-2"></i> ${formatTime(event.time)}
                                        </div>
                                    </div>
                                    <div class="flex items-center">
                                        <span class="inline-block px-3 py-1 ${isPastEvent ? "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-300" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"} rounded-full text-sm font-medium mr-2">
                                            ${isPastEvent ? "Past Event" : "Upcoming"}
                                        </span>
                                        ${
                                            registration.checkedIn
                                                ? `
                                        <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium">
                                            <i class="fas fa-check-circle mr-1"></i> Checked In
                                        </span>`
                                                : ""
                                        }
                                    </div>
                                </div>
                            </div>
                            <div class="p-4 flex flex-col md:flex-row gap-6">
                                <div class="md:w-1/2 space-y-3">
                                    <div class="flex items-start">
                                        <i class="fas fa-map-marker-alt mt-1 text-gray-500 mr-3 w-4 text-center"></i>
                                        <div>
                                            <p class="font-medium">Location</p>
                                            <p class="text-gray-600 dark:text-gray-400">${event.location}</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <i class="fas fa-ticket-alt mt-1 text-gray-500 mr-3 w-4 text-center"></i>
                                        <div>
                                            <p class="font-medium">${event.ticketType.name}</p>
                                            <p class="text-gray-600 dark:text-gray-400">${event.ticketType.price > 0 ? "$" + event.ticketType.price.toFixed(2) : "Free"}</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <i class="far fa-calendar-check mt-1 text-gray-500 mr-3 w-4 text-center"></i>
                                        <div>
                                            <p class="font-medium">Registration Date</p>
                                            <p class="text-gray-600 dark:text-gray-400">${formatDate(registration.registrationDate)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="md:w-1/2 flex flex-col items-center justify-center">
                                    <div class="ticket-qr-container mb-3"></div>
                                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Ticket Code: ${registration.ticketCode}</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Present QR code at the venue</p>
                                </div>
                            </div>
                        `;

                userTicketsContainer.appendChild(ticketCard);

                // Generate QR code
                const qrContainer = ticketCard.querySelector(
                    ".ticket-qr-container",
                );
                QRCode.toCanvas(
                    qrContainer,
                    registration.ticketCode,
                    {
                        width: 150,
                        margin: 2,
                        color: {
                            dark: "#5D5CDE",
                            light: "#ffffff",
                        },
                    },
                    function (error) {
                        if (error) console.error(error);
                    },
                );
            }
        });
    }
}

// Organizer functions
function renderOrganizerEvents() {
    
    const userId = document.getElementById("userid").innerHTML;
   
    
    

    const eventlist = db.events.filter(event => event.organizer_id === Number(userId));





    
    // Clear previous events
    organizerEventsTable.innerHTML = "";

    if (eventlist.length === 0) {
        noOrganizerEvents.classList.remove("hidden");
    } else {
        noOrganizerEvents.classList.add("hidden");

        eventlist.forEach((event) => {
            const row = document.createElement("tr");

            // Calculate sales and capacity
            const totalSold = event.ticketTypes.reduce(
                (sum, type) => sum + type.sold,
                0,
            );
            const totalCapacity = event.ticketTypes.reduce(
                (sum, type) => sum + type.capacity,
                0,
            );
            const soldPercent = Math.round((totalSold / totalCapacity) * 100);

            // Calculate revenue
            const totalRevenue = event.ticketTypes.reduce(
                (sum, type) => sum + type.sold * type.price,
                0,
            );

            // Check if event is past
            const eventDate = new Date(event.date);
            const isPastEvent = eventDate < new Date();

            row.innerHTML = `
                        <td class="px-6 py-4">
                            <div class="flex items-center">
                                <img class="h-10 w-16 object-cover rounded mr-3" src="${event.image}" alt="${event.title}">
                                <div>
                                    <div class="font-medium">${event.title}</div>
                                    <div class="text-sm text-gray-500 dark:text-gray-400">${formatDate(event.date)}</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">${formatDate(event.date)}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${isPastEvent ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"}">
                                ${isPastEvent ? "Completed" : "Active"}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm">${totalSold} / ${totalCapacity} (${soldPercent}%)</div>
                            <div class="text-sm font-medium">$${totalRevenue.toFixed(2)}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 view-attendees-btn" data-event-id="${event.id}">
                                <i class="fas fa-users mr-1"></i> Attendees
                            </button>
                        </td>
                    `;

            organizerEventsTable.appendChild(row);

            // Add event listener to attendees button
            const attendeesBtn = row.querySelector(".view-attendees-btn");
            attendeesBtn.addEventListener("click", () => {
                showEventAttendees(event.id);
            });
        });
    }
}

function showEventAttendees(eventId) {
    console.log(eventId);
    
    const event = db.events.find((e) => e.id === eventId);
    if (!event) return;
console.log('==>',event)
    manageEvents.classList.add("hidden");
    eventAttendees.classList.remove("hidden");

    // Set event title
    attendeesEventTitle.textContent = event.title;
//console.log(db.registrations)
    // Get attendees for this event
   

    let attendees = [];
db.registrations.forEach(reg => {
    if (reg.event === eventId) {
        attendees.push(reg);
    }
});
console.log('for me',attendees)

    // Calculate stats
    const totalSold = event.ticketTypes.reduce(
        (sum, type) => sum + type.sold,
        0,
    );
    const totalCapacity = event.ticketTypes.reduce(
        (sum, type) => sum + type.capacity,
        0,
    );
    const capacityPercent = Math.round((totalSold / totalCapacity) * 100);
    const totalRevenue = event.ticketTypes.reduce(
        (sum, type) => sum + type.sold * type.price,
        0,
    );

    // Update stats display
    document.getElementById("total-registrations").textContent = totalSold;
    document.getElementById("total-revenue").textContent =
        `$${totalRevenue.toFixed(2)}`;
    document.getElementById("capacity-filled").textContent =
        `${capacityPercent}%`;

    // Clear previous attendees
    attendeesTable.innerHTML = "";
console.log('==>',event)
    if (attendees.length === 0) {
        attendeesTable.innerHTML = "";
        noAttendees.classList.remove("hidden");
    } else {
        noAttendees.classList.add("hidden");

        attendees.forEach((attendee) => {
            const row = document.createElement("tr");

            const ticketType = event.ticketTypes.find(
                (t) => t.id === attendee.ticketTypeId,
            );

            row.innerHTML = `
                        <td class="px-6 py-4 whitespace-nowrap">${attendee.name}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${attendee.email}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${ticketType ? ticketType.name : "Unknown"}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${formatDate(attendee.registrationDate)}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            ${
                                attendee.checkedIn
                                    ? `<span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    <i class="fas fa-check-circle mr-1"></i> Checked In
                                </span>`
                                    : `<span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                    Not Checked In
                                </span>`
                            }
                        </td>
                    `;

            attendeesTable.appendChild(row);
        });
    }
}

function handleCreateEvent() {
    createEventForm.classList.remove("hidden");
    manageEvents.classList.add("hidden");
    eventAttendees.classList.add("hidden");
    analyticsDashboard.classList.add("hidden");
}

function handleManageEvents() {
    createEventForm.classList.add("hidden");
    manageEvents.classList.remove("hidden");
    eventAttendees.classList.add("hidden");
    analyticsDashboard.classList.add("hidden");

    renderOrganizerEvents();
}

function handleViewAnalytics() {
    createEventForm.classList.add("hidden");
    manageEvents.classList.add("hidden");
    eventAttendees.classList.add("hidden");
    analyticsDashboard.classList.remove("hidden");

    renderAnalytics();
}

function renderAnalytics() {
     const userId = document.getElementById("userid").innerHTML;

    const organizerEvents = db.events.filter(
        (event) => event.organizerId === Number(userId),
    );

    // Calculate stats
    const totalEvents = organizerEvents.length;
    const totalTickets = organizerEvents.reduce((sum, event) => {
        return (
            sum +
            event.ticketTypes.reduce(
                (ticketSum, type) => ticketSum + type.sold,
                0,
            )
        );
    }, 0);
    const totalRevenue = organizerEvents.reduce((sum, event) => {
        return (
            sum +
            event.ticketTypes.reduce(
                (ticketSum, type) => ticketSum + type.sold * type.price,
                0,
            )
        );
    }, 0);
    const avgTicketsPerEvent =
        totalEvents > 0 ? Math.round(totalTickets / totalEvents) : 0;

    // Update stats display
    document.getElementById("total-events").textContent = totalEvents;
    document.getElementById("total-tickets").textContent = totalTickets;
    document.getElementById("analytics-revenue").textContent =
        `$${totalRevenue.toFixed(2)}`;
    document.getElementById("avg-tickets").textContent = avgTicketsPerEvent;

    // Calculate top events
    const eventPerformance = organizerEvents
        .map((event) => {
            const soldTickets = event.ticketTypes.reduce(
                (sum, type) => sum + type.sold,
                0,
            );
            const revenue = event.ticketTypes.reduce(
                (sum, type) => sum + type.sold * type.price,
                0,
            );

            return {
                id: event.id,
                title: event.title,
                soldTickets,
                revenue,
            };
        })
        .sort((a, b) => b.revenue - a.revenue);

    // Display top events
    const topEventsTable = document.getElementById("top-events-table");
    topEventsTable.innerHTML = "";

    if (eventPerformance.length === 0) {
        topEventsTable.innerHTML =
            '<tr><td colspan="3" class="text-center py-4 text-gray-500 dark:text-gray-400">No events available</td></tr>';
    } else {
        eventPerformance.slice(0, 5).forEach((event) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                        <td class="py-2">${event.title}</td>
                        <td class="py-2">${event.soldTickets}</td>
                        <td class="py-2">$${event.revenue.toFixed(2)}</td>
                    `;
            topEventsTable.appendChild(row);
        });
    }

    // Update charts
    updateOrganizarAnalyticsCharts(organizerEvents);
}

function updateOrganizarAnalyticsCharts(events) {
    // Sales by event chart
    const eventLabels = events.map((event) => event.title);
    const eventSales = events.map((event) =>
        event.ticketTypes.reduce((sum, type) => sum + type.sold, 0),
    );
    const eventRevenues = events.map((event) =>
        event.ticketTypes.reduce(
            (sum, type) => sum + type.sold * type.price,
            0,
        ),
    );

    if (window.salesByEventChart) {
        window.salesByEventChart.destroy();
    }

    const salesByEventCtx = document
        .getElementById("sales-by-event-chart")
        .getContext("2d");
    window.salesByEventChart = new Chart(salesByEventCtx, {
        type: "bar",
        data: {
            labels: eventLabels,
            datasets: [
                {
                    label: "Tickets Sold",
                    data: eventSales,
                    backgroundColor: "rgba(93, 92, 222, 0.7)",
                    borderColor: "rgba(93, 92, 222, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0,
                    },
                },
            },
        },
    });

    // Sales over time
    // Simulate sales data over the past 6 months
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const currentMonth = new Date().getMonth();
    const pastMonths = [];

    for (let i = 5; i >= 0; i--) {
        let monthIndex = currentMonth - i;
        if (monthIndex < 0) monthIndex += 12;
        pastMonths.push(months[monthIndex]);
    }

    // Generate random sales data
    const monthlySales = Array.from(
        { length: 6 },
        () => Math.floor(Math.random() * 50) + 10,
    );
    const monthlyRevenue = monthlySales.map(
        (sales) => sales * (Math.random() * 50 + 20),
    );

    if (window.salesOverTimeChart) {
        window.salesOverTimeChart.destroy();
    }

    const salesOverTimeCtx = document
        .getElementById("sales-over-time-chart")
        .getContext("2d");
    window.salesOverTimeChart = new Chart(salesOverTimeCtx, {
        type: "line",
        data: {
            labels: pastMonths,
            datasets: [
                {
                    label: "Tickets",
                    data: monthlySales,
                    borderColor: "rgba(93, 92, 222, 1)",
                    backgroundColor: "rgba(93, 92, 222, 0.1)",
                    fill: true,
                    tension: 0.4,
                },
                {
                    label: "Revenue ($)",
                    data: monthlyRevenue,
                    borderColor: "rgba(46, 204, 113, 1)",
                    backgroundColor: "rgba(46, 204, 113, 0.1)",
                    fill: true,
                    tension: 0.4,
                    yAxisID: "revenue",
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    position: "left",
                    title: {
                        display: true,
                        text: "Tickets",
                    },
                },
                revenue: {
                    beginAtZero: true,
                    position: "right",
                    title: {
                        display: true,
                        text: "Revenue ($)",
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                },
            },
        },
    });

    // Ticket types distribution
    // Collect all ticket types
    const ticketTypeNames = [];
    const ticketTypeSales = [];

    events.forEach((event) => {
        event.ticketTypes.forEach((ticket) => {
            const existingIndex = ticketTypeNames.indexOf(ticket.name);
            if (existingIndex !== -1) {
                ticketTypeSales[existingIndex] += ticket.sold;
            } else {
                ticketTypeNames.push(ticket.name);
                ticketTypeSales.push(ticket.sold);
            }
        });
    });

    if (window.ticketTypesChart) {
        window.ticketTypesChart.destroy();
    }

    const ticketTypesCtx = document
        .getElementById("ticket-types-chart")
        .getContext("2d");
    window.ticketTypesChart = new Chart(ticketTypesCtx, {
        type: "doughnut",
        data: {
            labels: ticketTypeNames,
            datasets: [
                {
                    data: ticketTypeSales,
                    backgroundColor: [
                        "rgba(93, 92, 222, 0.7)",
                        "rgba(46, 204, 113, 0.7)",
                        "rgba(241, 196, 15, 0.7)",
                        "rgba(231, 76, 60, 0.7)",
                        "rgba(52, 152, 219, 0.7)",
                        "rgba(155, 89, 182, 0.7)",
                    ],
                    borderColor: [
                        "rgba(93, 92, 222, 1)",
                        "rgba(46, 204, 113, 1)",
                        "rgba(241, 196, 15, 1)",
                        "rgba(231, 76, 60, 1)",
                        "rgba(52, 152, 219, 1)",
                        "rgba(155, 89, 182, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "right",
                },
            },
        },
    });
}

// Admin functions
function handleAdminUsers() {
    adminUsers.classList.remove("hidden");
    adminAllEvents.classList.add("hidden");
    adminStatistics.classList.add("hidden");

    renderAdminUsers();
}

function handleAdminEvents() {
    adminUsers.classList.add("hidden");
    adminAllEvents.classList.remove("hidden");
    adminStatistics.classList.add("hidden");

    renderAdminEvents();
}

function handleAdminStats() {
    adminUsers.classList.add("hidden");
    adminAllEvents.classList.add("hidden");
    adminStatistics.classList.remove("hidden");

    renderAdminStats();
}

function renderAdminUsers() {
    const usersTable = document.getElementById("admin-users-table");
    usersTable.innerHTML = "";

    db.users.forEach((user) => {
        const row = document.createElement("tr");

        let roleLabel;
        if (user.isAdmin) {
            roleLabel =
                '<span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Admin</span>';
        } else if (user.isOrganizer) {
            roleLabel =
                '<span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Organizer</span>';
        } else {
            roleLabel =
                '<span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">User</span>';
        }

        row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">${user.id}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${user.username}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${user.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${roleLabel}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 tooltip">
                            <i class="fas fa-edit"></i>
                            <span class="tooltip-text">Edit User</span>
                        </button>
                        <button class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 ml-3 tooltip">
                            <i class="fas fa-trash-alt"></i>
                            <span class="tooltip-text">Delete User</span>
                        </button>
                    </td>
                `;

        usersTable.appendChild(row);
    });
}

function renderAdminEvents() {
    const eventsTable = document.getElementById("admin-events-table");
    eventsTable.innerHTML = "";

    db.events.forEach((event) => {
        const row = document.createElement("tr");

        // Check if event is past
        const eventDate = new Date(event.date);
        const isPastEvent = eventDate < new Date();

        const organizer = db.users.find((u) => u.id === event.organizerId);

        row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">${event.id}</td>
                    <td class="px-6 py-4">
                        <div class="flex items-center">
                            <img class="h-10 w-16 object-cover rounded mr-3" src="${event.image}" alt="${event.title}">
                            <div>
                                <div class="font-medium">${event.title}</div>
                                <div class="text-sm text-gray-500 dark:text-gray-400">${formatDate(event.date)}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">${organizer ? organizer.username : "Unknown"}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${formatDate(event.date)}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${isPastEvent ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"}">
                            ${isPastEvent ? "Completed" : "Active"}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 tooltip">
                            <i class="fas fa-edit"></i>
                            <span class="tooltip-text">Edit Event</span>
                        </button>
                        <button class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 ml-3 tooltip">
                            <i class="fas fa-trash-alt"></i>
                            <span class="tooltip-text">Delete Event</span>
                        </button>
                    </td>
                `;

        eventsTable.appendChild(row);
    });
}

function renderAdminStats() {
    // Calculate stats
    const totalUsers = db.users.length;
    const totalEvents = db.events.length;
    const totalTickets = db.registrations.length;
    const totalRevenue = db.registrations.reduce((sum, reg) => {
        const event = db.events.find((e) => e.id === reg.eventId);
        if (!event) return sum;

        const ticket = event.ticketTypes.find((t) => t.id === reg.ticketTypeId);
        if (!ticket) return sum;

        return sum + ticket.price;
    }, 0);

    // Update stats display
    document.getElementById("admin-total-users").textContent = totalUsers;
    document.getElementById("admin-total-events").textContent = totalEvents;
    document.getElementById("admin-total-tickets").textContent = totalTickets;
    document.getElementById("admin-total-revenue").textContent =
        `$${totalRevenue.toFixed(2)}`;

    // Initialize charts
    updateAdminCharts();
}

function updateAdminCharts() {
    // Events by category
    const categories = {};
    db.events.forEach((event) => {
        if (categories[event.category]) {
            categories[event.category]++;
        } else {
            categories[event.category] = 1;
        }
    });

    const categoryLabels = Object.keys(categories).map(
        (cat) => cat.charAt(0).toUpperCase() + cat.slice(1),
    );
    const categoryCounts = Object.values(categories);

    if (window.eventsByCategoryChart) {
        window.eventsByCategoryChart.destroy();
    }

    const eventsByCategoryCtx = document
        .getElementById("events-by-category-chart")
        .getContext("2d");
    window.eventsByCategoryChart = new Chart(eventsByCategoryCtx, {
        type: "pie",
        data: {
            labels: categoryLabels,
            datasets: [
                {
                    data: categoryCounts,
                    backgroundColor: [
                        "rgba(93, 92, 222, 0.7)",
                        "rgba(46, 204, 113, 0.7)",
                        "rgba(241, 196, 15, 0.7)",
                        "rgba(231, 76, 60, 0.7)",
                        "rgba(52, 152, 219, 0.7)",
                        "rgba(155, 89, 182, 0.7)",
                    ],
                    borderColor: [
                        "rgba(93, 92, 222, 1)",
                        "rgba(46, 204, 113, 1)",
                        "rgba(241, 196, 15, 1)",
                        "rgba(231, 76, 60, 1)",
                        "rgba(52, 152, 219, 1)",
                        "rgba(155, 89, 182, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "right",
                },
            },
        },
    });

    // Platform growth
    // Simulate registration/event creation data over months
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const currentMonth = new Date().getMonth();
    const pastMonths = [];

    for (let i = 5; i >= 0; i--) {
        let monthIndex = currentMonth - i;
        if (monthIndex < 0) monthIndex += 12;
        pastMonths.push(months[monthIndex]);
    }

    // Generate growth data
    const userGrowth = [12, 15, 20, 18, 25, 30]; // Hypothetical user growth
    const eventGrowth = [5, 8, 6, 10, 12, 15]; // Hypothetical event growth
    const ticketGrowth = [40, 60, 50, 80, 90, 120]; // Hypothetical ticket growth

    if (window.platformGrowthChart) {
        window.platformGrowthChart.destroy();
    }

    const platformGrowthCtx = document
        .getElementById("platform-growth-chart")
        .getContext("2d");
    window.platformGrowthChart = new Chart(platformGrowthCtx, {
        type: "line",
        data: {
            labels: pastMonths,
            datasets: [
                {
                    label: "Users",
                    data: userGrowth,
                    borderColor: "rgba(93, 92, 222, 1)",
                    backgroundColor: "rgba(93, 92, 222, 0.1)",
                    tension: 0.4,
                    fill: false,
                },
                {
                    label: "Events",
                    data: eventGrowth,
                    borderColor: "rgba(46, 204, 113, 1)",
                    backgroundColor: "rgba(46, 204, 113, 0.1)",
                    tension: 0.4,
                    fill: false,
                },
                {
                    label: "Tickets",
                    data: ticketGrowth,
                    borderColor: "rgba(52, 152, 219, 1)",
                    backgroundColor: "rgba(52, 152, 219, 0.1)",
                    tension: 0.4,
                    fill: false,
                    yAxisID: "tickets",
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    position: "left",
                    title: {
                        display: true,
                        text: "Users/Events",
                    },
                },
                tickets: {
                    beginAtZero: true,
                    position: "right",
                    title: {
                        display: true,
                        text: "Tickets",
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                },
            },
        },
    });
}

// Add a ticket type to the event creation form
function addTicketTypeField() {
    const ticketTypeTemplate = `
                <div class="ticket-type-form border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label class="block text-gray-700 dark:text-gray-300 mb-2">Ticket Name</label>
                            <input type="text" name="ticket-name[]" class="w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white" placeholder="e.g. General Admission" required>
                        </div>
                        <div>
                            <label class="block text-gray-700 dark:text-gray-300 mb-2">Price ($)</label>
                            <input type="number" name="ticket-price[]" min="0" step="0.01" class="w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white" required>
                        </div>
                        <div>
                            <label class="block text-gray-700 dark:text-gray-300 mb-2">Capacity</label>
                            <input type="number" name="ticket-capacity[]" min="1" class="w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white" required>
                        </div>
                    </div>
                    <div>
                        <label class="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
                        <input type="text" name="ticket-description[]" class="w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white" placeholder="What's included with this ticket">
                    </div>
                    <button type="button" class="remove-ticket-type mt-3 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 flex items-center">
                        <i class="fas fa-times-circle mr-2"></i> Remove
                    </button>
                </div>
            `;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = ticketTypeTemplate;
    const ticketTypeEl = tempDiv.firstElementChild;

    ticketTypesForm.appendChild(ticketTypeEl);

    // Add event listener to remove button
    const removeBtn = ticketTypeEl.querySelector(".remove-ticket-type");
    removeBtn.addEventListener("click", function () {
        ticketTypeEl.remove();
    });
}

async function createEvent(formData) {
    // Get form values
    console.log(formData);
    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const date = formData.get("date");
    const time = formData.get("time");
    const location = formData.get("location");

    // Get ticket types
    const ticketNames = formData.getAll("ticket-name[]");
    const ticketPrices = formData.getAll("ticket-price[]");
    const ticketCapacities = formData.getAll("ticket-capacity[]");
    const ticketDescriptions = formData.getAll("ticket-description[]");

    const ticketTypes = [];
    for (let i = 0; i < ticketNames.length; i++) {
        ticketTypes.push({
            name: ticketNames[i],
            price: parseFloat(ticketPrices[i]),
            description: ticketDescriptions[i],
            capacity: parseInt(ticketCapacities[i]),
            sold: 0,
        });
    }

    const newEvent = {
        title,
        description,
        date,
        time,
        location,
        category,
        image: generateEventImage(title, category),
        organizer: currentUser.username,
        organizerId: currentUser.id,
        status: "upcoming",
        createdAt: new Date().toISOString().split("T")[0],
        ticketTypes,
    };

    try {
        const token = localStorage.getItem("jwtToken"); // Retrieve JWT token
        const response = await fetch("https://your-api-url.com/events", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`, // Include authentication token
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEvent),
        });

        if (!response.ok) {
            throw new Error("Failed to create event");
        }

        const createdEvent = await response.json();

        // Hide form and show success message
        createEventForm.classList.add("hidden");
        showToast(
            "success",
            "Event Created",
            `"${createdEvent.title}" has been successfully created.`,
        );

        // Update events display
        renderEvents();

        // Reset form
        document.getElementById("event-form").reset();
    } catch (error) {
        console.error("Event creation error:", error);
        showToast(
            "error",
            "Event Creation Failed",
            "Could not create the event.",
        );
    }

    // Reset form
    document.getElementById("event-form").reset();

    // Reset ticket types to just one
    ticketTypesForm.innerHTML = `
                <div class="ticket-type-form border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label class="block text-gray-700 dark:text-gray-300 mb-2">Ticket Name</label>
                            <input type="text" name="ticket-name[]" class="w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white" placeholder="e.g. General Admission" required>
                        </div>
                        <div>
                            <label class="block text-gray-700 dark:text-gray-300 mb-2">Price ($)</label>
                            <input type="number" name="ticket-price[]" min="0" step="0.01" class="w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white" required>
                        </div>
                        <div>
                            <label class="block text-gray-700 dark:text-gray-300 mb-2">Capacity</label>
                            <input type="number" name="ticket-capacity[]" min="1" class="w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white" required>
                        </div>
                    </div>
                    <div>
                        <label class="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
                        <input type="text" name="ticket-description[]" class="w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white" placeholder="What's included with this ticket">
                    </div>
                </div>
            `;

    // Show manage events page
    handleManageEvents();
}

// Initialize charts
function initCharts() {
    // Only create charts if they need to be displayed
    if (
        currentUser &&
        currentUser.isOrganizer &&
        currentPage === "organizer" &&
        !analyticsDashboard.classList.contains("hidden")
    ) {
        renderAnalytics();
    }

    if (
        currentUser &&
        currentUser.isAdmin &&
        currentPage === "admin" &&
        !adminStatistics.classList.contains("hidden")
    ) {
        renderAdminStats();
    }
}

// Helper functions
function formatDate(dateString, short = false) {
    if (!dateString) return "";

    if (short) {
        const options = { month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    } else {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
}

function formatTime(timeString) {
    if (!timeString) return "";

    try {
        const [hours, minutes] = timeString.split(":");
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    } catch (e) {
        return timeString;
    }
}

function showToast(type, title, message) {
    // Configure toast based on type
    switch (type) {
        case "success":
            toastIcon.className =
                "flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-500 flex items-center justify-center mr-3";
            toastIconSymbol.className = "fas fa-check";
            break;
        case "error":
            toastIcon.className =
                "flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center mr-3";
            toastIconSymbol.className = "fas fa-times";
            break;
        case "info":
            toastIcon.className =
                "flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-3";
            toastIconSymbol.className = "fas fa-info";
            break;
        case "warning":
            toastIcon.className =
                "flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 text-yellow-500 flex items-center justify-center mr-3";
            toastIconSymbol.className = "fas fa-exclamation";
            break;
    }

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    // Show toast
    toast.classList.remove("hidden");

    // Auto hide after 3 seconds
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 3000);
}

// Setup event listeners
function setupEventListeners() {
    // Auth
    /*
                loginForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const email = document.getElementById('login-email').value;
                    const password = document.getElementById('login-password').value;

                    if (login(email, password)) {
                        loginForm.reset();
                    } else {
                        showToast('error', 'Login Failed', 'Invalid email or password. Please try again.');
                    }
                });

                signupForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const username = document.getElementById('signup-username').value;
                    const email = document.getElementById('signup-email').value;
                    const password = document.getElementById('signup-password').value;
                    const isOrganizer = document.getElementById('signup-organizer').checked;

                    if (signup(username, email, password, isOrganizer)) {
                        signupForm.reset();
                    } else {
                        showToast('error', 'Signup Failed', 'Email already exists. Please use a different email or login.');
                    }
                });

                loginButton.addEventListener('click', () => {
                    showPage('auth');
                    loginSection.classList.remove('hidden');
                    signupSection.classList.add('hidden');
                });

                registerButton.addEventListener('click', () => {
                    showPage('auth');
                    loginSection.classList.add('hidden');
                    signupSection.classList.remove('hidden');
                });

                logoutButton.addEventListener('click', () => {
                    logout();
                    userDropdown.classList.add('hidden');
                });

                switchToSignup.addEventListener('click', () => {
                    loginSection.classList.add('hidden');
                    signupSection.classList.remove('hidden');
                });

                switchToLogin.addEventListener('click', () => {
                    loginSection.classList.remove('hidden');
                    signupSection.classList.add('hidden');
                });
*/
    // Navigation
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            showPage(link.dataset.page);
        });
    });

    mobileNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
            showPage(link.dataset.page);
            mobileMenu.classList.add("hidden");
        });
    });

    document
        .getElementById("profile-dropdown")
        .addEventListener("click", (e) => {
            e.preventDefault();
            showPage("profile");
            userDropdown.classList.add("hidden");
        });

    document
        .getElementById("organizer-dropdown")
        .addEventListener("click", (e) => {
            e.preventDefault();
            showPage("organizer");
            userDropdown.classList.add("hidden");
        });

    document.getElementById("admin-dropdown").addEventListener("click", (e) => {
        e.preventDefault();
        showPage("admin");
        userDropdown.classList.add("hidden");
    });

    // Mobile menu
    mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    // User menu dropdown
    userMenuButton.addEventListener("click", () => {
        userDropdown.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (
            !userMenuButton.contains(e.target) &&
            !userDropdown.contains(e.target)
        ) {
            userDropdown.classList.add("hidden");
        }
    });

    // Event modal
    closeModal.addEventListener("click", () => {
        eventModal.classList.add("hidden");
    });

    // Close modal when clicking outside
    eventModal.addEventListener("click", (e) => {
        if (e.target === eventModal) {
            eventModal.classList.add("hidden");
        }
    });
    //ticket-types-container
    // Registration form
    document
        .getElementById("registration-form")
        .addEventListener("submit", (e) => {
            e.preventDefault();

            if (!selectedTicketType) {
                showToast(
                    "error",
                    "Ticket Required",
                    "Please select a ticket type before proceeding.",
                );
                return;
            }

            //const formData = new FormData(e.target);
            const name = document.getElementById("reg-name").value;
            const email = document.getElementById("reg-email").value;
            const formData = {
                name: name,
                email: email,
            };

            registerForEvent(selectedEvent, selectedTicketType, formData);
            name.value = "";
            email.value = "";
        });

    document.getElementById("close-success").addEventListener("click", () => {
        eventModal.classList.add("hidden");
        // Refresh events
        renderEvents();
    });

    // Modal login/signup
    /* modalLogin.addEventListener('click', () => {
                    eventModal.classList.add('hidden');
                    showPage('auth');
                    loginSection.classList.remove('hidden');
                    signupSection.classList.add('hidden');
                });

                modalSignup.addEventListener('click', () => {
                    eventModal.classList.add('hidden');
                    showPage('auth');
                    loginSection.classList.add('hidden');
                    signupSection.classList.remove('hidden');
                });*/

    // Event search and filters
    eventSearch.addEventListener(
        "input",
        debounce(() => {
            renderEvents();
        }, 300),
    );

    categoryFilter.addEventListener("change", () => {
        renderEvents();
    });

    dateFilter.addEventListener("change", () => {
        renderEvents();
    });

    priceFilter.addEventListener("change", () => {
        renderEvents();
    });

    // Category pills
    categoryPills.forEach((pill) => {
        pill.addEventListener("click", () => {
            const category = pill.dataset.category;

            if (category === "all") {
                categoryFilter.value = "";
            } else {
                categoryFilter.value = category;
            }

            renderEvents();
        });
    });

    // Organizer dashboard
    createEventBtn.addEventListener("click", handleCreateEvent);
    cancelEventBtn.addEventListener("click", () => {
        createEventForm.classList.add("hidden");
    });

    manageEventsBtn.addEventListener("click", handleManageEvents);
    viewAnalyticsBtn.addEventListener("click", handleViewAnalytics);

    // Back button on attendees view
    backToManage.addEventListener("click", handleManageEvents);

    // Event form ticket types
    addTicketType.addEventListener("click", addTicketTypeField);

    // Create event form submission
    eventForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(eventForm);
        createEvent(formData);
    });

    // Admin dashboard
    //adminUsersBtn.addEventListener("click", handleAdminUsers);
    //adminEventsBtn.addEventListener("click", handleAdminEvents);
    //adminStatsBtn.addEventListener("click", handleAdminStats);

    // Toast
    closeToast.addEventListener("click", () => {
        toast.classList.add("hidden");
    });
}

// Utility for debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize the application
document.addEventListener("DOMContentLoaded", initApp);
