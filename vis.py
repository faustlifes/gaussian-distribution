import numpy as np
import matplotlib.pyplot as plt

def gaussian(x, mu, sigma):
    return np.exp(-np.power((x - mu), 2.)/(2.* np.power(sigma, 2)))

bigLower, lower, curr, higher, bigHigher = 20, 60, 80, 100, 140
pers10 = (bigHigher - bigLower) * 0.2
pers5 = (bigHigher - bigLower) * 0.05
lowerLimit, higherLimit = bigLower - pers10, bigHigher + pers10
x =  np.linspace(lowerLimit, higherLimit, 1000)
sigma = (higher - pers5 - lower)
y = gaussian(x, curr, sigma)
#y = np.max(y)
plt.figure(figsize=(10,6))
plt.plot(x, y)
plt.xlim(lowerLimit, higherLimit)
plt.ylim(0, 1.1)

# Add labels and title
plt.xlabel("prediction")
plt.ylabel('y')
plt.title('Curve')

plt.axvline(x=bigLower, color='b', linestyle='--', alpha=0.5)
plt.axvline(x=lower, color='r', linestyle='--', alpha=0.5)
plt.axvline(x=curr, color='g', linestyle= '--', alpha=0.5)
plt.axvline(x=higher, color='r', linestyle= '--', alpha=0.5)
plt.axvline(x=bigHigher, color='b', linestyle= '--', alpha=0.5)

plt.text(bigLower, 0.05, f'bigLower={bigLower}', rotation=90, verticalalignment='bottom')
plt.text(lower, 0.05, f'lower={lower}', rotation=90, verticalalignment='bottom')
plt.text (curr, 0.05, f'curr={curr}', rotation=90, verticalalignment='bottom')
plt.text(higher, 0.05, f'higher={higher}', rotation=90, verticalalignment='bottom')
plt.text(bigHigher, 0.05, f'higher={bigHigher}', rotation=90, verticalalignment='bottom')

plt.grid(True)
plt.show()