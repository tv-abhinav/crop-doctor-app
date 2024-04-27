# [Create venv:](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)

```
    python3 -m venv .venv
    source .venv/bin/activate
```
# Install
Install Deps & Download Model before proceeding.
## Deps
```
    cd server
    pip install -r requirements.txt
```
## ONNX Model
ONNX Model Location: https://github.com/Gateway2745/SEMFD-Net/blob/master/demo/ensemble.onnx
# Start server
```
    python3 main.py
```