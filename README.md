# Hotel Offer Orchestrator

**Tech Stack:** Node.js (TypeScript) • Express • Temporal • Redis • Docker Compose

## Overview

The **Hotel Offer Orchestrator** is a service designed to aggregate and normalize hotel offers from multiple suppliers.  
It leverages **Temporal Workflows** for resilient orchestration and **Redis** for high-performance caching and price-based querying.

## REST Endpoints

| Endpoint                                                    | Description                         |
| ----------------------------------------------------------- | ----------------------------------- |
| `GET /api/hotels?city=<city>`                               | Returns hotels for a specific city  |
| `GET /api/hotels?city=<city>&minPrice=<min>&maxPrice=<max>` | Returns hotels within a price range |
| `GET /supplierA/hotels`, `GET /supplierB/hotels`            | Mock supplier endpoints             |

## Prerequisites

Before running this service, ensure **Docker** is installed and running on your system.

**Install Docker:**  
[https://www.docker.com/get-started/](https://www.docker.com/get-started/)

### Then follow these steps

```bash
git clone <repo-url>
cd hotel-offer-orchestrator
docker compose up --build
```
