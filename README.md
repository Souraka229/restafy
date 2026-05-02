# Restafy API

Un wrapper Python simple et puissant pour l'API Restafary.

## Installation

```bash
pip install restafy
```

## Utilisation

```python
from restafy import RestafyClient

client = RestafyClient("votre-token")
result = client.get("/endpoint")
print(result)
```

## Fonctionnalités

- Interface simple pour l'API Restafary
- Support complet des méthodes HTTP
- Gestion automatique des erreurs
- Retry automatique en cas d'échec
- Logging détaillé

## Installation depuis les sources

```bash
git clone https://github.com/Souraka229/restafy.git
cd restafy
pip install -e .
```