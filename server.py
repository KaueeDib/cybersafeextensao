from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

HOST = "127.0.0.1"
PORT = 8000
ROOT = Path(__file__).resolve().parent

class CyberSafeHandler(SimpleHTTPRequestHandler):
    # Evita listagem desnecessaria de diretorios e mantém o projeto restrito ao localhost.
    def log_message(self, format, *args):
        print(f"[CyberSafe] {self.address_string()} - {format % args}")

if __name__ == "__main__":
    import os
    os.chdir(ROOT)
    server = ThreadingHTTPServer((HOST, PORT), CyberSafeHandler)
    print(f"CyberSafe rodando em http://{HOST}:{PORT}/")
    print("Pressione Ctrl+C para encerrar.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor encerrado.")
    finally:
        server.server_close()
