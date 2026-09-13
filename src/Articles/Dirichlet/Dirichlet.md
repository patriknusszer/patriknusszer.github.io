In an earlier blog post, I have shown how to gain the Fourier coefficients.
For this, we have assumed the convergence to take place.
It is important to notice that the proof of the formula of the coefficients proves
nothing about convergence. Hence, here I would like to provide different sufficient conditions
for the convergence.
Precisely, I wish to show:

* if the function $f$ is differentiable at $x_0$
* if the function is at least continuous at every point in the interval $\left[ - \pi, \pi \right]$ (or may have finite number of jump/removable discontinuities here)
* if $x_0 \in \left] -\pi, \pi \right[$
  the Fourier series is guaranteed to converge to $f(x_0)$.
  And I will also show that the last condition mentioned can be weakened to arbitrary $x_0$ if the function is $2\pi$ periodic.

Let's define the Fourier series of $f$ on the interval $[-\pi,\ \pi]$.

$$
f(x) = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(u)\,du + \sum_{n=1}^{\infty} (\frac{1}{\pi}\int_{-\pi}^{\pi} f(u)\cos(nu)\,du\cos(nx) + \frac{1}{\pi}\int_{-\pi}^{\pi} f(u)\sin(nu)\,du\sin(nx))
$$

That is the form with the coefficients included. Now we will need to tranform it into a different form in which we can better handle it.
We have a sum of integrals, and we wish to make it an integral of sum. We can freely do that given that we do not bring the limes
operation inside the integral (we just leave it outside). That is, we can freely swap the sum and integral, we just need to be aware
of the fact that we are looking at the limes of the integral after the swapping, we can not take the limes of the summation
and then perform the integration. In order to avoid any misunderstanding, I am going to replace the infinity in the upper limit
of the summation with a variable $N$ after the swapping.

$$
\frac{1}{\pi}\int_{-\pi}^{\pi} f(u) [\frac{1}{2} + \sum_{n=1}^{N} (\cos(nx)\cos(nu) + \sin(nx)\sin(nu)]\,du
$$

Note the expression inside the square brackets. To the sum of the trigonometric functions, we can apply an addition formula and
therefore it equates to:

$$
\frac{1}{\pi}\int_{-\pi}^{\pi}f(u)[\frac{1}{2} + \sum_{n=1}^{N}\cos(n(x - u))]
$$

Please note the expression inside the square brackets. That is the Dirichlet kernel
(named after Peter Gustav Lejeune Dirichlet, a student of Joseph Fourier).
We wish to find a closed form for the kernel, lending us a great dose of convenience
(because it is always harder to work with a summation)

$$
D_N(x) = \frac{1}{2} + \sum_{n=1}^{N}\cos(nx)
$$

Multiply by $\sin(\frac{1}{2}x)$ on both sides:

$$
\sin(\frac{1}{2}x)D_N(x) = \frac{1}{2}\sin(\frac{1}{2}x) + \sum_{n=1}^{N}\cos(nx)\sin(\frac{1}{2}x)
$$

Now we apply the following indentity:

$$
\cos(a)\sin(b) = \frac{\sin(a + b) - \sin(a - b)}{2}
$$

So that we obtain:

$$
\cos(nx)\sin(\frac{1}{2}x) = \frac{\sin((n + \frac{1}{2})x) - \sin((n - \frac{1}{2})x)}{2}
$$

Substituting it back:

$$
\sin(\frac{1}{2}x)D_N(x) = \sin(\frac{1}{2}x)\frac{1}{2} + \frac{1}{2}\sum_{n=1}^{N} \sin((n + \frac{1}{2})x) - \sin((n - \frac{1}{2})x)
$$

You just need to realise that it is a telescopic sum on the right hand side so preserving only the first and last term
leaves us with:

$$
\sin(\frac{1}{2}x)D_N(x) = \sin(\frac{1}{2}x)\frac{1}{2} - \frac{1}{2}\sin(\frac{1}{2}x) + \sin((N + \frac{1}{2})x)
$$

Note the two terms canceling out on the right hand side, dividing by $\sin(\frac{1}{2}x)$ gives yields the closed form:

$$
D_N(x) = \frac{\sin((N + \frac{1}{2})x)}{2\sin(\frac{x}{2})}
$$

We put away this result temporarily.
So this is the Fourier series expressed in terms of Dirichlet kernel:

$$
\frac{1}{\pi}\int_{-\pi}^{\pi} f(u)D_N(x - u)\,du
$$

Sadly, it is not enough. We need to make one more modification.
Our aim is to have a single dummy variable as parameter of the kernel.
For that we need to make a change of variables.
We want to make the substitution $u = x - t$ where $t$ is the new dummy variable.

$$
\frac{1}{\pi}\int_{-\pi}^{\pi}f(u)D_N(x - u)\,du = -1 \cdot \frac{1}{\pi} \int_{x + \pi}^{x - \pi} f(x - t)D_N(t)\,dt
$$

Now note that swapping the bounds of the integral changes its sign so we get:

$$
= \frac{1}{\pi} \int_{x-\pi}^{x+\pi} f(x - t)D_N(t)\,dt
$$

The $x$ in the bounds of the integral does not look quite pretty but in order
to gain better insights I am ought to live it as it is.
With this last step though we have made all the needed modifications to the Fourier series
and now in order to make it a good pair of $f(x)$ we also bring $f(x)$ to a form in which it is easier to handle.

Please note that:

$$
\frac{1}{\pi}\int_{-\pi}^{\pi}D_N(u)\,du = 1
$$

I do not want to prove it separately, but it is quite easy to imagine.
Remember the summation form of the kernel? It is basically a half and the sum of
all cosines with all frequencies up to $N$ down from $1$. The integral of cosine
over any interval of length $2\pi$ is zero, except when the frequency is zero.
But that is actually the cosine from which the one half originates.
But if every cosine down from the one with frequency $1$ up to the one with frequency $N$
will have an integral of zero, then the result is basically just the integral of
one half over the interval of length $2\pi$ divided by $\frac{1}{\pi}$ which is $1$.
Please note that you shall get the same result over any such interval:

$$
\frac{1}{\pi}\int_{x-\pi}^{x+\pi} D_N(u)\,du = 1
$$

Now we multiply both sides by $f(x)$ and note that since $x$ is independent
of the variable of integration (the dummy) so that we can safely bring it into and out of the integral:

$$
\frac{1}{\pi}\int_{x-\pi}^{x+\pi} f(x)D_N(u)\,du = f(x)
$$

Now we are ready with the preparation of $f(x)$ and the series so that we can write up their
difference under a single integral, thanks to the transformations:

$$
f(x) - S_N(s) = \frac{1}{\pi} \int_{x-\pi}^{x+\pi} D_N(t)(f(x) - f(x - t))\,dt
$$

And again, this is true for whatever $x$. Now we embark on the journey to the Riemann-Lebesgue Lemma
and how the integrals can fulfill Riemann-integrability (which is a precondition of R-L Lemma).
The lemma states the Fourier coefficients vanish at infinity and what we aim at is
transforming this integral into a sum of two other integrals that are Fourier coefficients of
some other two functions expressed in terms of $f(x)$.

So we begin by expanding the Dirichlet kernel to its closed form:

$$
\frac{1}{\pi} \int_{x-\pi}^{x+\pi} \frac{\sin((N + \frac{1}{2})x)}{2\sin(\frac{t}{2})}(f(x) - f(x - t))\,dt
$$

We apply a simple addition formula to the numerator of the kernel:

$$
\frac{1}{\pi}\int_{x-\pi}^{x+\pi} \frac{f(x) - f(x - t)}{2\sin(\frac{t}{2})}(\sin(Nt)\cos(\frac{1}{2}) + \cos(Nt)\sin(\frac{t}{2}))
$$

Now, we expand the product into a sum, and along that we split the integral into two:

$$
\frac{1}{\pi}\int_{x-\pi}^{x+\pi}\frac{f(x) - f(x - t)}{2}\cos(Nt)\,dt + \frac{1}{\pi}\int_{x-\pi}^{x+\pi}\frac{(f(x) - f(x - t))\cos(\frac{t}{2})}{2\sin(\frac{t}{2})}\sin(Nt)\,dt
$$

And now the Rimeann-Lebesgue Lemma follows.
I am first going to state the result and this condition, prove that the Fourier series converges and then prove the lemma separately.
According to this lemma, for an $F(u)$ that is Riemann integrable over $[a,\ b]$ it holds that:

$$
\lim_{N \to \infty}\int_{a}^{b} F(u)\cos(Nu)\,du = \int_{a}^{b} F(u)\sin(Nu)\,du = 0
$$

Please note one more interesting fact: The Fourier series is an infinite sum of cosines and sines multiplied by
Fourier coefficients. There exists a necessary condition for the convergence of any series.
That is, the summed expression must go to zero at infinity. Cosine and sine are bounded, can take on values
between $-1$ and $1$. Their sum therefore can not go to zero. What this observation suggests is
if the trigonometric functions can not go to zero, then instead the Fourier coefficients must go to zero.
The proof of this is this lemma.

So if we let $F_0 = \frac{f(x) - f(x - t)}{2}$ then we can see that $F_0$ is continuous everywhere,
given that $f$ is continuous in the range $[ -\pi, \pi ]$. Because this is the property we need if we integrate on $[ x - \pi,\ x + \pi ]$.
The continuity of $F_0$ over $[ x - \pi,\ x + \pi ]$ means it is Rimenan integrable over this interval, and therefore this integral
vanishes due to the Riemann-Lebesgue Lemma. But you can loosen your assumptions as far as $f$ having finite number of
jump/removable discontinuities in this range, this still allows Riemann integrability.

The situation in case of $F_1 = \frac{(f(x) - f(x - t))\cos(\frac{t}{2})}{2\sin(\frac{t}{2})}$ is a lot more complicated.
We can see that $F_1$ has a discontinuity whenever $\sin(\frac{t}{2}) = 0$ which must occur over any interval of length $2\pi$ once or twice, since
sine is zero whenever $t = k\cdot2\pi$. This is not necessarily an issue because Riemann-integrability applies to functions with finite number of discontinuities over the given interval, but if this discontinuity is an infinite discontinuity, then the
function is unbounded over this integral and so then it can not be Riemann-integrable and we can not apply the lemma.
(Because if the function explodes in value at this point then its integral is ought to diverge and can not go to zero)

If we stubbornly stick to our need that $f$ should not be periodic we still can make an important observation.
The right side integral also vanishes when $x \in ]-\pi,\ \pi[$ because in this case the singularity (here the discontinuity)
occurs exactly and only at the origin, when $t = 0$. (Where $t$ is the dummy).
At this point the function $F_1$ is of the form $\frac{0}{0}$. Just think about it:
if it was not of this form at the point of such a discontinuity, then it would instead be
of the form $\frac{C}{0}\quad C \in \mathbb{R} \setminus {0}$. But in this case we can be sure that the integrand function goes to $\pm \infty$ and the integrand would not be bounded at this point
(and hence would not be Riemann-integrable). So our only chance for
good stuff to happen is if the integrand is of the form $\frac{0}{0}$ at a point
of discontinuity. Now you would think it would make sense to apply the L'Hospital rule.
That would not be a good solution even though it would prove the integrand is bounded at the point of discontinutiy.
Applying L'Hospital would then force us to impose upon f that it should be continuously differentiable around $x$.
However, we can algebraically rearrange $F_1$ so that we can show that its limit is $f'(x)$
which means we only need to impose upon $f$ that it is differentiable only at $x$ for
convergence to happen.
So as $t \to 0$ we get for $F_1$:

$$
\lim_{t \to 0}\frac{f(x) - f(x - t)}{t}\frac{\frac{t}{2}}{\sin(\frac{t}{2})}=f'(x)
$$

Since $F_1$ has a discontinuity at $t = 0$ but at this point the limit of $F_1$ is $f'(x)$
which exists and is a real number due to the differentiability of $f$, the function can not explode in value here.
It must be a removable discontinuity, therefore $F_1$ is bounded over $[ x - \pi,\ x + \pi ]$
and therefore it is Riemann-integrable here.
So the Fourier series converges to arbitrary differentiable $f$ whenever $x \in ] -\pi,\ \pi [$.
But as mentioned earlier, it is also sufficient if $f$ is continuous over $[ -\pi,\ \pi ]$ or has
finite number of jump/removable discontinuities, and only differentiable at $x$, because in this case
Riemann integrability still holds.

Now, we can make our life easier, if we impose the condition upon $f$ that it shall be $2\pi$ periodic.
Why? Because with this we can eleminate all other singularities.
Our singularity occurs whenever $t \to k2\pi$.
At this point, the denominator of $F_1$ tends to zero. If we wish $F_1$ it to be of the form $\frac{0}{0}$
then whenever $t$ tends to a $2k\pi$ value we wish this property exactly, for $\forall\ x$:

$$
\lim_{t \to k2\pi} f(x) - f(x - t) = 0
$$

Taking the limit we obtain:

$$
f(x) - f(x - k2\pi) = 0
$$

Which is essentially:

$$
f(x) = f(x - k2\pi)
$$

Which is, if satisfied for $\forall\ x,\ k$, then it means $f$ is $2\pi$ periodic.
But please note that it is true the other way around. Sure, if $F_1$ is of the form $\frac{0}{0}$
then it implies $f$ is $2\pi$ periodice, but if we know $f$ is $2\pi$ periodic then it implies
the $F_1$ function that belongs to it must be of the form $\frac{0}{0}$ whenever $t \to k2\pi$.

That being said, the limit of the function may be $\pm f'(x)$ depending on the parity of $k$,
but still, most importantly, the limit exists and it is a bounded real value.

So let $t = 2k\pi + h$, so that $t \to 2k\pi$ is equivalent to $h \to 0$.
So expressing the problematic integrand in this way we get:

$$
\lim_{h \to 0}\frac{f(x) - f(x - (2k\pi + h))}{h}\frac{\frac{h}{2}}{\sin(\frac{2k\pi + h}{2})}=(-1)^kf'(x)
$$

Because:

$$
\frac{\frac{h}{2}}{\sin(\frac{2k\pi + h}{2})} = \frac{\frac{h}{2}}{\sin(k\pi + \frac{h}{2})}=\frac{\frac{h}{2}}{(-1)^k\sin(\frac{h}{2})}
$$

Or, with an autistic mind we can also do the following.
Imposing the periodicity condition upon $f$ we can translate
(shift) the two integrals to the interval $[-\pi,\ \pi]$:

$$
\frac{1}{\pi}\int_{-\pi}^{\pi}\frac{f(x) - f(x - t)}{2}\cos(Nt)\,dt + \frac{1}{\pi}\int_{-\pi}^{\pi}\frac{(f(x) - f(x - t))\cos(\frac{t}{2})}{2\sin(\frac{t}{2})}\sin(Nt)\,dt
$$

And now we can use the first reasoning again that when $t = 0$ we are guaranteed
that our function bounded and the Riemann-Lebesgue lemma applies to both integrals,
and they go to zero.

And now here I am going to prove the Riemann-Lebesgue Lemma

Let $f$ be Riemann integrable over $[a,\ b]$. Then:

$$
\lim_{n \to \infty} \int_{a}^{b} f(x)\cos(nx)\,dx = 0
$$

Proof: since $f$ is Riemann integrable, for $\forall \epsilon > 0$ there $\exists \phi(\epsilon)$
step function on $[a,\ b]$ such that at every point $\phi \le f$ by common sense, and:

$$
\left| \int_{a}^{b} f - \int_{a}^{b} \phi \right| < \epsilon
$$

And it implies that:

$$
\left| \int_{a}^{b} f(x)\cos(nx)\,dx - \int_{a}^{b} \cos(nx)\,dx \right| \le \int_{a}^{b} (f(x) - \phi(x))|\cos(nx)|\,dx < \epsilon
$$

Now what this essentially implies is that by decreasing $\epsilon$ we can make the integrals on the left arbitrarily close to each other.
Now, if we could also show that the integral with the step function goes to zero, it would inherently mean that the integral from
which we subtracted it follows it to zero and the lemma would be proven.

So let's show:

$$
\lim_{n \to \infty} \int_{a}^{b} \phi(x)\cos(nx)\,dx = 0
$$

Imagine the following partition of the interval $[a,\ b]$ by the step function.
The step function samples the function at some places and retains that value over a small interval,
the smaller $\epsilon$ is the shorter these intervals are, and the step function begins
looking more and more like the original function. So let $l$ denote the level of partition,
or precisely the number of subintervals $[a,\ b]$ is divided into. Then consider the constant $c_i$
values the step functino takes on at these intervals indexed by $i$. So our partition is
$[x_0,\ x_1[,.....[x_{l-1},\ x_l[$) and the corresponding constants are $c_0,\ c_1,......c_l$.
Then we split the above integral into the sum of those integrals that integrate the integrand over
these subintervals, and so we can forget about $\phi$. The major takeaway is that any step function on an interval can be
epxressed as the linear combination of characteristic functions of subintervals of the interval.

$$
\left| \int_{a}^{b} \phi(x)\cos(nx)\,dx\right| = \left| \sum_{i=1}^{l} \int_{x_{i - 1}}^{x_i} c_I\cdot \cos(nx)\right|
$$

Now we take the antiderivative of the integrand, evaluate it over the subinterval and write up this approximation:

$$
\le \sum_{i=1}^{l} \frac{|c_i|}{n}|\sin(nx_i) - \sin(nx_{i - 1})|
$$

And note that the absolute value of the difference of 2 sines can never exceed 2!

$$
\le \sum_{i=1}^{l} \frac{|c_i|}{n}|\sin(nx_i) - \sin(nx_{i - 1})| \le 2\sum_{i=1}^{l} \frac{|c_i|}{n}
$$

And since the sum on the right hand side goes to zero and the integral of the step function is bounded by this sum,
it must also go to zero. But then if it goes to zero, then it means the integral stated in our lemma should follow it to zero,
and therefore the lemma is proven.
