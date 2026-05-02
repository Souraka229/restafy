"""
Restafy - Un wrapper Python simple et puissant pour l'API Restafary.
"""

import requests
import time
import logging
from typing import Optional, Dict, Any

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class RestafyError(Exception):
    """Exception personnalisée pour les erreurs Restafy."""
    pass


class RestafyClient:
    """Client pour l'API Restafary."""
    
    BASE_URL = "https://restafary.com/api/v1"
    MAX_RETRIES = 3
    RETRY_DELAY = 1
    
    def __init__(self, token: str, base_url: Optional[str] = None, max_retries: int = 3):
        """
        Initialise le client Restafy.
        
        Args:
            token: Token d'API Restafary
            base_url: URL de base de l'API (optionnel)
            max_retries: Nombre maximum de tentatives (optionnel)
        """
        self.token = token
        self.base_url = base_url or self.BASE_URL
        self.max_retries = max_retries
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        })
        logger.info(f"Restafy client initialisé")
    
    def _request(self, method: str, endpoint: str, **kwargs) -> Dict[str, Any]:
        """Effectue une requête HTTP avec retry."""
        url = f"{self.base_url}{endpoint}"
        
        for attempt in range(self.max_retries):
            try:
                logger.info(f"Requête {method} vers {url}")
                response = self.session.request(method, url, **kwargs)
                response.raise_for_status()
                logger.info(f"Réponse: {response.status_code}")
                return response.json()
            except requests.exceptions.RequestException as e:
                logger.warning(f"Attempt {attempt + 1} échoué: {e}")
                if attempt < self.max_retries - 1:
                    time.sleep(self.RETRY_DELAY * (attempt + 1))
                else:
                    raise RestafyError(f"Échec après {self.max_retries} tentatives: {e}")
        
        return {}
    
    def get(self, endpoint: str, params: Optional[Dict] = None) -> Dict[str, Any]:
        """Effectue une requête GET."""
        return self._request("GET", endpoint, params=params)
    
    def post(self, endpoint: str, data: Optional[Dict] = None) -> Dict[str, Any]:
        """Effectue une requête POST."""
        return self._request("POST", endpoint, json=data)
    
    def put(self, endpoint: str, data: Optional[Dict] = None) -> Dict[str, Any]:
        """Effectue une requête PUT."""
        return self._request("PUT", endpoint, json=data)
    
    def delete(self, endpoint: str) -> Dict[str, Any]:
        """Effectue une requête DELETE."""
        return self._request("DELETE", endpoint)
    
    def close(self):
        """Ferme la session."""
        self.session.close()
        logger.info("Session fermée")


__version__ = "1.0.0"
__all__ = ["RestafyClient", "RestafyError"]