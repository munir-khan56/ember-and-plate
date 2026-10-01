const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:5000/api" : "/api")

/**
 * Fetch menu items, optionally filtered by category
 * @param {string} [category]
 * @returns {Promise<Array>}
 */
export async function fetchMenuItems(category) {
  try {
    const url =
      category && category !== "All"
        ? `${API_BASE_URL}/menu?category=${encodeURIComponent(category)}`
        : `${API_BASE_URL}/menu`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch menu items (status: ${response.status})`)
    }

    return await response.json()
  } catch (error) {
    console.error("API error in fetchMenuItems:", error.message)
    throw error
  }
}

/**
 * Fetch a single menu item by ID
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function fetchMenuItemById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/menu/${id}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch menu item (status: ${response.status})`)
    }

    return await response.json()
  } catch (error) {
    console.error("API error in fetchMenuItemById:", error.message)
    throw error
  }
}

/**
 * Create a new menu item (Admin only)
 * @param {Object} data
 * @param {string} [token]
 * @returns {Promise<Object>}
 */
export async function createMenuItem(data, token) {
  try {
    const authToken =
      token ||
      (typeof window !== "undefined" ? localStorage.getItem("token") : null)

    const headers = {
      "Content-Type": "application/json",
    }
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`
    }

    const response = await fetch(`${API_BASE_URL}/menu`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    })

    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.message || "Failed to create menu item")
    }

    return result
  } catch (error) {
    console.error("API error in createMenuItem:", error.message)
    throw error
  }
}

/**
 * Update an existing menu item (Admin only)
 * @param {string} id
 * @param {Object} data
 * @param {string} [token]
 * @returns {Promise<Object>}
 */
export async function updateMenuItem(id, data, token) {
  try {
    const authToken =
      token ||
      (typeof window !== "undefined" ? localStorage.getItem("token") : null)

    const headers = {
      "Content-Type": "application/json",
    }
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`
    }

    const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    })

    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.message || "Failed to update menu item")
    }

    return result
  } catch (error) {
    console.error("API error in updateMenuItem:", error.message)
    throw error
  }
}

/**
 * Delete a menu item (Admin only)
 * @param {string} id
 * @param {string} [token]
 * @returns {Promise<Object>}
 */
export async function deleteMenuItem(id, token) {
  try {
    const authToken =
      token ||
      (typeof window !== "undefined" ? localStorage.getItem("token") : null)

    const headers = {}
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`
    }

    const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: "DELETE",
      headers,
    })

    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.message || "Failed to delete menu item")
    }

    return result
  } catch (error) {
    console.error("API error in deleteMenuItem:", error.message)
    throw error
  }
}

/**
 * Register a new user
 * @param {Object} data - { name, email, password, confirmPassword }
 * @returns {Promise<Object>}
 */
export async function registerUser(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.message || "Failed to register")
    }

    return result
  } catch (error) {
    console.error("API error in registerUser:", error.message)
    throw error
  }
}

/**
 * Authenticate user with credentials
 * @param {Object} data - { email, password }
 * @returns {Promise<Object>}
 */
export async function loginUser(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.message || "Failed to login")
    }

    return result
  } catch (error) {
    console.error("API error in loginUser:", error.message)
    throw error
  }
}

/**
 * Get current authenticated user profile
 * @param {string} token
 * @returns {Promise<Object>}
 */
export async function getCurrentUser(token) {
  try {
    const authToken =
      token ||
      (typeof window !== "undefined" ? localStorage.getItem("token") : null)

    if (!authToken) {
      throw new Error("No token provided")
    }

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.message || "Failed to authenticate token")
    }

    return result
  } catch (error) {
    console.error("API error in getCurrentUser:", error.message)
    throw error
  }
}

/**
 * Create a new table reservation (Guest or Authenticated)
 * @param {Object} data
 * @param {string} [token]
 * @returns {Promise<Object>}
 */
export async function createReservation(data, token) {
  try {
    const authToken =
      token || (typeof window !== "undefined" ? localStorage.getItem("token") : null)

    const headers = {
      "Content-Type": "application/json",
    }

    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`
    }

    const response = await fetch(`${API_BASE_URL}/reservations`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Failed to make reservation")
    }

    return result
  } catch (error) {
    console.error("API error in createReservation:", error.message)
    throw error
  }
}

/**
 * Get all reservations (Admin only)
 * @param {string} token
 * @returns {Promise<Array>}
 */
export async function getReservations(token) {
  try {
    const authToken =
      token || (typeof window !== "undefined" ? localStorage.getItem("token") : null)

    const headers = {}
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`
    }

    const response = await fetch(`${API_BASE_URL}/reservations`, {
      headers,
    })

    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch reservations")
    }

    return result
  } catch (error) {
    console.error("API error in getReservations:", error.message)
    throw error
  }
}

/**
 * Get single reservation by ID (Admin only)
 * @param {string} id
 * @param {string} token
 * @returns {Promise<Object>}
 */
export async function getReservationById(id, token) {
  try {
    const authToken =
      token || (typeof window !== "undefined" ? localStorage.getItem("token") : null)

    const headers = {}
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`
    }

    const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
      headers,
    })

    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch reservation")
    }

    return result
  } catch (error) {
    console.error("API error in getReservationById:", error.message)
    throw error
  }
}

/**
 * Update reservation status (Admin only)
 * @param {string} id
 * @param {string} status
 * @param {string} token
 * @returns {Promise<Object>}
 */
export async function updateReservationStatus(id, status, token) {
  try {
    const authToken =
      token || (typeof window !== "undefined" ? localStorage.getItem("token") : null)

    const headers = {
      "Content-Type": "application/json",
    }
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`
    }

    const response = await fetch(`${API_BASE_URL}/reservations/${id}/status`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ status }),
    })

    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.message || "Failed to update reservation status")
    }

    return result
  } catch (error) {
    console.error("API error in updateReservationStatus:", error.message)
    throw error
  }
}

/**
 * Delete a reservation (Admin only)
 * @param {string} id
 * @param {string} token
 * @returns {Promise<Object>}
 */
export async function deleteReservation(id, token) {
  try {
    const authToken =
      token || (typeof window !== "undefined" ? localStorage.getItem("token") : null)

    const headers = {}
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`
    }

    const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
      method: "DELETE",
      headers,
    })

    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.message || "Failed to delete reservation")
    }

    return result
  } catch (error) {
    console.error("API error in deleteReservation:", error.message)
    throw error
  }
}
