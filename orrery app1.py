import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Constants for the solar system
SUN_MASS = 1.989e30  # kg (mass of the Sun)
GRAVITATIONAL_CONSTANT = 6.67430e-11  # m^3 kg^-1 s^-2
AU = 1.496e11  # 1 Astronomical Unit in meters (distance from Earth to Sun)

# Function to generate random near-solar objects
def generate_near_solar_objects(num_objects=25):
    objects = []

    for i in range(num_objects):
        # Randomly generate semi-major axis between 0.5 AU and 5 AU
        semi_major_axis = np.random.uniform(0.5, 5) * AU  # in meters

        # Random eccentricity between 0 (circular orbit) and 0.5 (elliptical orbit)
        eccentricity = np.random.uniform(0, 0.5)

        # Random inclination between 0 and 30 degrees
        inclination = np.radians(np.random.uniform(0, 30))  # convert to radians

        # Random true anomaly between 0 and 360 degrees (angle in orbit)
        true_anomaly = np.radians(np.random.uniform(0, 360))  # convert to radians

        # Calculate position (x, y, z) based on these parameters
        x = semi_major_axis * np.cos(true_anomaly)
        y = semi_major_axis * np.sin(true_anomaly) * np.cos(inclination)
        z = semi_major_axis * np.sin(true_anomaly) * np.sin(inclination)

        # Save the object with its position and orbital characteristics
        objects.append({
            'semi_major_axis': semi_major_axis / AU,  # convert back to AU for display
            'eccentricity': eccentricity,
            'inclination': np.degrees(inclination),  # convert back to degrees for display
            'position': (x / AU, y / AU, z / AU)  # positions in AU
        })

    return objects

# Generate 25 near-solar objects
objects = generate_near_solar_objects(25)

# Create a 3D plot for visualization
fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')

# Plot the Sun at the center
ax.scatter(0, 0, 0, color='yellow', s=100, label='Sun')

# Plot each near-solar object
for obj in objects:
    x, y, z = obj['position']
    ax.scatter(x, y, z, label=f"Object at {obj['semi_major_axis']:.2f} AU", s=50)

# Labels and plot settings
ax.set_xlabel('X (AU)')
ax.set_ylabel('Y (AU)')
ax.set_zlabel('Z (AU)')
ax.set_title('Simulation of 25 Near-Solar Objects Orbiting the Sun')
ax.legend(loc='upper right', fontsize='small')

# Set equal scaling
ax.set_box_aspect([1, 1, 1])

plt.show()
