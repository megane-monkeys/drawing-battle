import torch
import numpy as np
import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), './'))

import cv2

class model():
    def __init__(self, filename):
        self.model = torch.load(filename, map_location = torch.device('cpu')).eval()
        self.classes = ["りんご", "本", "蝶ネクタイ", "キャンドル",
                        "雲", "コップ", "ドア", "封筒",	"メガネ",
                        "ギター", "ハンマー", "帽子", "アイスクリーム", "葉っぱ",
                        "ハサミ", "星", "Tシャツ", "パンツ", "稲妻", "木"]

    def predict(self, data):
        data = self.format_data(data)
        logits = self.model(data)
        return self.classes[torch.argmax(logits[0])]

    def format_data(self, data):
        x_min = int(np.min([point[0] for stroke in data for point in stroke]))
        x_max = int(np.max([point[0] for stroke in data for point in stroke]))
        y_min = int(np.min([point[1] for stroke in data for point in stroke]))
        y_max = int(np.max([point[1] for stroke in data for point in stroke]))

        image = np.zeros((x_max - x_min + 1, y_max - y_min + 1, 3), dtype = np.uint8)

        for stroke in data:
            coords = [[int(point[0] - x_min), int(point[1] - y_min)] for point in stroke]
            for i in range(len(coords) - 1):
                cv2.line(image, (coords[i][0], coords[i][1]), (coords[i+1][0], coords[i+1][0]),  (255, 255, 255) , 5)

        image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        image = cv2.resize(image, (28, 28))
        cv2.imwrite(os.path.join(os.path.dirname(__file__), './ena_opencv_gray.jpg'), image)

        image = np.array(image, dtype=np.float32)[None, None, :, :]
        image = torch.from_numpy(image)
        return image

drawing_battle_model = model(os.path.join(os.path.dirname(__file__), './whole_model_quickdraw'))
