import threading
import time
import datetime
import math


class TestThread(threading.Thread):

    """docstring for TestThread"""

    def __init__(self):
        super(TestThread, self).__init__()
        self.val = 0

    def getData(self):
        return self.val

    def run(self):
        count = 0
        while True:
            count += 1
            time.sleep(0.05)
            self.val = math.sin(count / 180.0 * 3.14) * 10 + 10
