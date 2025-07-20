# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Component Library

## Setup Instructions

1. Build the Docker image:
   ```bash
   docker build -t otero_samir_coding_assignment13 .

2. Run the container:
    ```bash
    docker run -p 8018:8018 --name otero_samir_coding_assignment13 otero_samir_coding_assignment13

3. Access the component library at: http://localhost:8018

### Testing & Quality Assurance

1. **Run all tests:** `npm test`
2. **Build Storybook:** `npm run build-storybook`
3. **Test Docker setup** locally
4. **Verify responsive design** across different screen sizes
5. **Check all Storybook controls** work properly

## Key Success Criteria

✅ All 9+ components implemented with required file structure
✅ Styled Components used for all styling
✅ All components are responsive
✅ Storybook with controls and default/disabled states
✅ All tests pass (visibility + disabled state minimum)
✅ Docker runs successfully on localhost:8083
✅ Professional README with clear instructions

## Pro Tips

1. **Start with Button component** as a template for others
2. **Use TypeScript interfaces** consistently across components
3. **Test Docker setup early** to avoid last-minute issues
4. **Make components reusable** with good prop interfaces
5. **Document edge cases** in Storybook stories

This assignment demonstrates real-world component library development skills that are highly valuable in modern web development. Take your time with each phase and test thoroughly!