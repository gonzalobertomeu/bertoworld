COMPOSE=docker compose -f infrastructure/compose.yml -p bertoworld

.PHONY: up up-build down build logs restart ps

up:
	$(COMPOSE) up -d

up-build:
	$(COMPOSE) up --build -d

down:
	$(COMPOSE) down

build:
	$(COMPOSE) build

logs:
	$(COMPOSE) logs -f

restart:
	$(COMPOSE) restart

ps:
	$(COMPOSE) ps
