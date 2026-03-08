const techCategories = [
    {
        title: "AI & Machine Learning",
        icon: "fa-solid fa-brain",
        color: "#ff6b6b",
        technologies: [
            {
                name: "Python",
                icon: "fa-brands fa-python",
                color: "python",
                desc: "The primary language for model scripting, backend tasks, and general automations.",
                tags: ["Scripting", "Data Analysis", "Backend"]
            },
            {
                name: "PyTorch",
                icon: "fa-solid fa-fire", // closest representation using FA
                color: "pytorch",
                desc: "Developing deep learning models and complex neural networks.",
                tags: ["Deep Learning", "Tensors", "Neural Nets"]
            },
            {
                name: "TensorFlow",
                icon: "fa-solid fa-microchip", // closest alternative
                color: "tensorflow",
                desc: "Building and deploying machine learning architectures and data-flow graphs.",
                tags: ["Machine Learning", "Deployment"]
            },
            {
                name: "OpenCV",
                icon: "fa-solid fa-eye",
                color: "opencv",
                desc: "Leveraging computer vision applications for real-time image processing.",
                tags: ["Computer Vision", "Camera", "Imaging"]
            },
            {
                name: "Matplotlib",
                icon: "fa-solid fa-chart-line",
                color: "matplotlib",
                desc: "Creating static, animated, and interactive data visualizations.",
                tags: ["Data Vis", "Plotting"]
            },
            {
                name: "Ollama",
                icon: "fa-solid fa-robot",
                color: "ollama",
                desc: "Running extensive localized AI models for integrated application logic.",
                tags: ["Local AI", "GenAI", "LLMs"]
            },
            {
                name: "N8N",
                icon: "fa-solid fa-code-merge",
                color: "n8n",
                desc: "Creating advanced logic workflows and connecting APIs for AI pipelines.",
                tags: ["Workflows", "Automation", "No-code"]
            }
        ]
    },
    {
        title: "Software & Web Development",
        icon: "fa-solid fa-layer-group",
        color: "#61dafb",
        technologies: [
            {
                name: "React",
                icon: "fa-brands fa-react",
                color: "react",
                desc: "Building dynamic component-based web interfaces and complex client-side applications.",
                tags: ["Frontend", "Views", "Hooks"]
            },
            {
                name: "Vite",
                icon: "fa-solid fa-bolt",
                color: "vite",
                desc: "Supercharging development speed and optimizing next-generation frontend frameworks.",
                tags: ["Bundler", "HMR", "Performance"]
            },
            {
                name: "Node.js",
                icon: "fa-brands fa-node-js",
                color: "node",
                desc: "Underlying ecosystem for project tooling, custom APIs, and scalable network ops.",
                tags: ["Backend", "V8 Engine", "Async"]
            },
            {
                name: "MS Dynamics AL",
                icon: "fa-brands fa-microsoft",
                color: "msal",
                desc: "Developing and customizing extensions for robust enterprise resource planning.",
                tags: ["ERP", "Enterprise", "Dynamics 365"]
            },
            {
                name: "MongoDB",
                icon: "fa-solid fa-database",
                color: "mongo",
                desc: "Storing, managing, and querying document-based NoSQL functional data.",
                tags: ["Database", "NoSQL", "Mongoose"]
            }
        ]
    }
];

const container = document.getElementById('tech-categories-container');

// Render Categories and Cards
techCategories.forEach(category => {
    // Create section shell
    const section = document.createElement('section');
    section.classList.add('category-section');

    // Create header
    const header = document.createElement('div');
    header.classList.add('category-header');
    header.innerHTML = `
        <i class="${category.icon}" style="color: ${category.color}"></i>
        <h2>${category.title}</h2>
    `;
    section.appendChild(header);

    // Create Grid layout
    const grid = document.createElement('div');
    grid.classList.add('grid');

    // Generate Cards for this Category
    category.technologies.forEach(tech => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-color', tech.color);

        const tagsHtml = tech.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        card.innerHTML = `
            <div class="card-content">
                <div class="card-header">
                    <div class="icon-wrapper">
                        <i class="${tech.icon}"></i>
                    </div>
                    <h3>${tech.name}</h3>
                </div>
                <p>${tech.desc}</p>
                <div class="tags">
                    ${tagsHtml}
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    section.appendChild(grid);
    container.appendChild(section);
});


// 3D Tilt and Mouse Tracker Effect
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set CSS variables for the glowing hover effect background
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Calculate rotation for 3D tilt
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const maxRotation = 10;

        const rotateX = ((y - centerY) / centerY) * -maxRotation;
        const rotateY = ((x - centerX) / centerX) * maxRotation;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'none'; // snappy follow
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease-out'; // smooth reset
    });
});
