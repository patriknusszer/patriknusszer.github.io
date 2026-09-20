In this blog post, I am going to write about approximating continuous functiosn with trigonometric series.
It has already been shown, that Fourier Series does not convergence to every continuous function.
The question is: can the Fourier series be modified, so that it converges to any continuous function?
The theorem of Lipót Fejér makes two statements:

* The Césaro means of the Fourier series converge to the mean of the function's left and right limits at x (given these exist. if $f$ is continuous at x, it is guaranteed)
* The Césaro means of the Fourier series uniformly covnerge to $f$ on $[a, b]$ provided $f$ is continuous over this interval

It is important to foremention that Lebesgue later gave more general criteria for the convergence of the Césaro means. (Other article)

Let's define this arithmetic mean:

$$
\sigma(x) = \frac{1}{n + 1} \cdot \sum_{k=1}^{n} S_k(x)
$$

In which formula $S_k$ is the $k$th Fourier partial sum.

We understand the following rearrangement of the Fourier series:

$$
\frac{1}{\pi}\int_{-\pi}^{\pi} f(u)D_N(x - u)\,du
$$

We have also seen that the substitution $u = x - t$ will bring us to this form:

$$
-1 \cdot \frac{1}{\pi} \int_{x+\pi}^{x-\pi}f(x-t)D_N(t)\,dt = \int_{x-\pi}^{x+\pi}f(x-t)D_N(t)\,dt
$$

Now for convenience, let $f(x)$ be $2\pi$ periodic.
Even this way convergence in case of aperiodic functions over $]-\pi,\ \pi[$ will still follow.
This way, our integral must equal:

$$
\frac{1}{\pi} \int_{-\pi}^{+\pi}f(x-t)D_N(t)\,dt
$$

So that we managed to eliminate the $x$ variable.
Now consider what we would gain if substituted $u = x + t$:

$$
\frac{1}{\pi} \int_{-\pi}^{+\pi}f(x+t)D_N(t)\,dt
$$

Let's split this integral into two:

$$
\frac{1}{\pi} \int_{0}^{+\pi}f(x+t)D_N(t)\,dt + \frac{1}{\pi} \int_{-\pi}^{0}f(x+t)D_N(t)\,dt
$$

Due to the Dirichlet kernel being an even function, we shall observe the following:

$$
\frac{1}{\pi} \int_{-\pi}^{0}f(x+t)D_N(t)\,dt = \frac{1}{\pi} \int_{0}^{+\pi}f(x-t)D_N(t)\,dt
$$

This way we obtian the followign form of the Fourier series:

$$
\frac{1}{\pi} \int_{0}^{+\pi}(f(x+t) + f(x - t))D_N(t)\,dt
$$

This is a very well known form of the Fourier series, and it is also used in other convegrence proofs, such as the Dirichlet-Jordan theorem.
We continue the proof by splitting this integral into two pieces:

$$
\frac{1}{\pi} \int_{0}^{\delta}(f(x+t) + f(x - t))D_N(t)\,dt + \frac{1}{\pi} \int_{\delta}^{\pi}(f(x+t) + f(x - t))D_N(t)\,dt
$$

We are interested in looking at the difference of the Fourier series and $f(x)$. For easy handling, we want to bring $f(x)$ under the integral expression.
The idea is, to express $f(x)$ wit the integral of the Fejér kernel. For that, recall that for the Dirichlet kernel it holds that:

$$
\int_{-\pi}^{\pi} D_N(t)\,dt = \pi
$$

Since the Dirichlet kernel is an even function, it must be true that:

$$
\int_{0}^{\pi} D_N(t)\,dt = \frac{\pi}{2}
$$

Now since the $n$th Fejér kernel is simply just the average of first the $n$ Dirichlet kernels, we obtain this for the integral of
the Fejér kernel:

$$
\int_{0}^{\pi} K_N(t)\,dt = \frac{1}{n + 1} \cdot (n + 1)\frac{\pi}{2} = \frac{\pi}{2}
$$

This lets us express $f(x)$ in the following form:

$$
\frac{1}{\pi} \int_{0}^{\pi} 2f(x)\,dt = f(x)
$$

This enables us to bring $2f(x)$ under the integral, when subtracting it from the Dirichlet kernel:

$$
\mid \sigma(x) - f(x) \mid = \mid \frac{1}{\pi} \int_{0}^{+\pi}(f(x+t) + f(x - t) - 2f(x))D_N(t)\,dt \mid
$$

Now, the integral is going to be split into two pieces, and handled differently.
For that, let's define $f(x)$ as $\frac{f(x+0) + f(x-0)}{2}$, the average of the limits
of $f$ at $x$. This means that, for the below function:

$$
f(x + t) + f(x - t) - f(x + 0) - f(x - 0) = \phi_x(t)
$$

...we can find a $\delta$, for $\forall \epsilon > 0$, such, that
if $\mid t \mid < \delta$, then $\mid \phi(x) \mid < \epsilon$.
So here is the split integral:

$$
\frac{1}{\pi} \int_{0}^{+\sigma}\mid \phi_x(t)\mid D_N(t)\,dt + \frac{1}{\sigma} \int_{\sigma}^{\pi}\phi_x(t)D_N(t)\,dt
$$

The left hand integral can over estimated by the following majorant:

$$
\frac{1}{\pi} \int_{0}^{+\sigma}\epsilon D_N(t)\,dt
$$

Observe that, we are free choose $\delta $to our liking, so the left hand integral can be kept arbitrarily small.
Now, we need to deal with teh right hadn itnegral, but that is a tougher job.

So let this form of the partial sum be whose arithmetic mean is taken.
So we add up the first $N$ partials sums and divide the sum by $N + 1$.
Please observe: We again aim at rewriting a sum of integrals to an
integral of a sum. The divisor $N + 1$ can be freely moved in and out of the integral
as it is independent of the integration variable. Also, we can factor out
from the some $[f(x+t) + f(x-t)]$ since it is common in every term.
Then necessarily what our sum becomes is the arithmetic mean of the first $N$
Dirichlet kernels, and we also leave the $N + 1$ divisor in the terms.
The sum we gain inside the integral is called the Fejér kernel.

$$
\sigma(x) = \frac{1}{N + 1}(S_0(x)+S_1(x)+......+S_N(x))=\frac{1}{\pi}\int_{0}^{\pi}[f(x+t)+f(x-t)]K_N(t)\,dt
$$

Where $K_N(t) = \frac{1}{N + 1} \sum_{k=0}^{N}\frac{\sin((k + \frac{1}{2})t)}{2\sin(\frac{1}{2}t)}$

Just like in case of the Dirichlet kernel, we are looking for a closed form for the Fejér kernel.
Please note the following expression:

$$
\sum_{k=0}^{N} 2\sin((k + \frac{1}{2})t)\sin(\frac{1}{2}t)
$$

Based on the identity $\cos(a-b)-\cos(a+b)=2\sin(b)\sin(a)$ which can be proven with addition formula we gain:

$$
= -1 \cdot \sum_{0}^{N}[\cos((k+1)t) - \cos(kt)]
$$

Now note that this is a telescoping sum and so preserving the first and last term we obtain:

$$
1-\cos((N+1)t)
$$

Which is:

$$
2\sin^2((N+1)t)
$$

This can be proven by applying the identity $\sin^2(x) = 1 - \cos^2(x)$ and
then transforming the the product of cosines to a sum of cosines.
Using this expression we can rearrange the Fejér kernel:

$$
K_N(x) = \frac{\sin^2(\frac{N + 1}{2}x)}{2(N + 1)\sin^2(\frac{1}{2}x)}
$$
