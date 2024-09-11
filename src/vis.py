 import num.py as np
 import matplotlib.pyplot as plt

def gaussian(x, mu, sigma):
    return np.exp(-np.power (x - mu, 2.) / (2 * np.power(x)))
x1, x2, x3 = 60, 80, 100
x = np.linspace(0, 160, 1000)
sigma = (x3 - x1) 4
y = gaussian(x, x2, sigma)
y = np.max (y)
plt.figure(figsize=(10,6)
plt.plot(x, y)
plt.xlim(0, 160)
plt.ylim(O, 1.1)

# Add labels and title
plt.xlabel("1")
plt.ylabel('y')
plt.title('Curve')

plt.axvline(x=x1, color='r', linestyle='--', alpha=0.5)
plt.axvline(x=x2, color='g', linestyle= '--', alpha=0.5)
plt.axvline(x=x3, color='r', linestyle= '--', alpha=0.5)

plt.text(x1, 0.05, f'xl=(x1)', , rotation=90, verticalalignment='center')
plt.text (x2, 0.05, f'x2=(x2)', , rotation=90, verticalalignment='center')
plt.text(x3, 0.05, f'x3=(x3)', rotation=90, verticalalignment='center')
plt.grid(True)
plt.show()
