from torch import nn
import pytorch_lightning as pl


class LITAutoEncoder(pl.LightningModule):
    def __init__(self):
        super().__init__()
        self.encoder = nn.Sequential()
        self.decoder = nn.Sequential()

class Encoder(nn.Modele):
    def __init__(self):
        pass

    def forward(self, x):
        pass