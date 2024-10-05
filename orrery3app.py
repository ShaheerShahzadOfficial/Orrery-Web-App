import requests
import numpy as np
import matplotlib.pyplot as plt
# Constants
API_KEY = "DEMO_KEY"  # Replace this with your actual NASA API key
NEO_API_URL = "https://api.nasa.gov/neo/rest/v1/feed"
AU = 1.496e11  # 1 Astronomical Unit in meters (distance from Earth to Sun)

# Function to fetch NEO data from NASA's API
def fetch_near_earth_objects(start_date='2024-10-01', end_date='2024-10-07'):
    params = {
        'start_date': start_date,
        'end_date': end_date,
        'api_key': API_KEY
    }
    
    response = requests.get(NEO_API_URL, params=params)
    data = response.json()
    print(data['near_earth_objects'])
    # Collect all near-earth objects from the API
    neos = []
    for date in data['near_earth_objects']:
        for neo in data['near_earth_objects'][date]:
            if 'close_approach_data' in neo and len(neo['close_approach_data']) > 0:
                close_approach = neo['close_approach_data'][0]
                # Convert distance to AU and get only those with known distances
                if 'miss_distance' in close_approach and 'astronomical' in close_approach['miss_distance']:
                    distance_au = float(close_approach['miss_distance']['astronomical'])
                    neos.append({
                        'name': neo['name'],
                        'distance_au': distance_au,
                        'velocity_km_s': float(close_approach['relative_velocity']['kilometers_per_second'])
                    })
    return neos

# Fetch NEO data for the given date range
neo_data = fetch_near_earth_objects()

# Create a 3D plot for visualization
fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')

# Plot the Sun at the center
ax.scatter(0, 0, 0, color='yellow', s=100, label='Sun')

# Plot each Near-Earth Object based on its distance from the Sun
for neo in neo_data:
    # Randomize positions within a sphere based on the distance (AU)
    theta = np.random.uniform(0, 2 * np.pi)
    phi = np.random.uniform(0, np.pi)
    
    # Convert spherical coordinates to Cartesian (x, y, z)
    r = neo['distance_au']
    x = r * np.sin(phi) * np.cos(theta)
    y = r * np.sin(phi) * np.sin(theta)
    z = r * np.cos(phi)
    
    # Plot the NEO
    ax.scatter(x, y, z, label=f"{neo['name']} ({neo['distance_au']:.2f} AU)", s=50)

# Labels and plot settings
ax.set_xlabel('X (AU)')
ax.set_ylabel('Y (AU)')
ax.set_zlabel('Z (AU)')
ax.set_title('NASA Near-Earth Object (NEO) Data Visualization')

# Add a legend
ax.legend(loc='upper right', fontsize='small')

# Set equal scaling for the plot
ax.set_box_aspect([1, 1, 1])

# Show the plot
plt.show()
