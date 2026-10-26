<!--Measuring unusualness-->

One way of measuring the **unusualness** of a given data point $\vec{x}$ is taking the $\operatorname{L}_2$ norm (Euclidean length) of the $z$-score vector:

$$
\vec{z} = \frac{\vec{x} - \vec{\pi}_c}{\vec{\sigma}_c}
$$

- $\vec{x}$ is the data point, each coordinate representing a measure of a trait
- $\vec{\pi}_c$ is the mean vector of class $c$, each coordinate representing the mean of a trait
- $\vec{\sigma}_c$ is the standard deviation vector, each coordinate representing the standard deviation of one of a trait 

Therefore a $z$-score can roughly be thought of as a vector of standardized deviations of different traits from the means. Each deviation from the mean $x_i - \pi_{x_i}$ is compared against the respective standard deviation $\sigma_{x_i}$ by division to measure **how many typical deviations is the value from the mean**.

The problem with measuring **unusualness** this way is the fact that the original features might be **correlated**. For example, if two features have great standardized deviations, but it is known they correlate strongly in their direction, then they contribute great **unusualness** but the fact that it was expected due their great correlation is **not discounted**.

The idea is to instead measure **unusualness** of **transformed features that are uncorrelated**. And in particular: can these **transformed features be linear combinations of the original features**?

<!--Eigendecomposition and diagonalization of covariance matrix-->

**Lemma**

The linear combinations of the standardized deviations of the original features with the eigenvectors of covariance matrix  yield uncorrelated features, and the variances of these new features are the eigenvalues of the covariance matrix:

$$
\operatorname{Cov}(\vec{z}Q)=\Lambda
$$

Where $\Lambda$ is a diagonal matrix, hence transformed traits do not correlate.

**Proof**

The key identity is the following:

$$
\Sigma Q = Q \Lambda
$$

- $\Sigma$ is a matrix, here in particular, the covariance matrix of the features in $\vec{x}$
- $\Lambda$ is a diagonal matrix, here in particular, the elements of the diagonal are the eigenvalues of $\Sigma$

$$
\begin{aligned}
\Sigma &=
\begin{bmatrix}
\sigma_{11} & \sigma_{12} & \cdots & \sigma_{1n}\\
\sigma_{21} & \sigma_{22} & \cdots & \sigma_{2n}\\
\vdots      & \vdots      & \ddots & \vdots\\
\sigma_{n1} & \sigma_{n2} & \cdots & \sigma_{nn}
\end{bmatrix}\\
\Lambda &=
\begin{bmatrix}
\lambda_1 &        &        & 0\\
           & \lambda_2 &     &  \\
           &        & \ddots &  \\
0          &        &        & \lambda_n
\end{bmatrix}
\end{aligned}
$$

The covariance matrix is a $n \cdot n$ table, each cell $\sigma_{ij}$ representing the covariance of feature $i$ and feature $j$. At the diagonal $\sigma_{ii}$ is a covariance of some  feature with itself which equals the variance of the feature.

In general, the abovementioned equation is the eigenvalue problem for multiple eigenvectors and eigenvalues.

After multiplication on the right hand side, the matrix $(Q \Lambda)$ will contain the columns vectors of $Q$ each multiplied by one of the constants of $\Lambda$.

$$
\begin{aligned}

Q &=
\begin{bmatrix}
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert \\
\vec{q_1} & \vec{q_2} & \cdots & \vec{q_n} \\
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert
\end{bmatrix}\\

Q \Lambda &=
\begin{bmatrix}
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert \\
\lambda_1 \vec{q_1} & \lambda_2 \vec{q_2} & \cdots & \lambda_n \vec{q_n} \\
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert
\end{bmatrix}
\end{aligned}
$$

And on the left hand side after multiplication, the resulting column vectors of matrix $(\Sigma Q)$ can each be viewed as column vectors of $Q$, each multiplied by $\Sigma$.

$$
\Sigma Q =
\begin{bmatrix}
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert \\
\Sigma \vec{q_1} & \Sigma \vec{q_2} & \cdots & \Sigma \vec{q_n} \\
\vphantom{\Large A}\vert & \vphantom{\Large A}\vert & & \vphantom{\Large A}\vert
\end{bmatrix}
$$

Therefore, for $\forall\ \vec{q_i} \in Q$ and their corresponding constant $ \Lambda_{ii} \in \Lambda $ the following must hold:

$$
\Sigma \vec{q_i} = \vec{q_i} \Lambda_{ii}
$$

Which is the eigenvalue problem for one eigenvector for an eigenvalue from $\Lambda$ and an eigenvector from the column vectors of $Q$.

From the above identity an important conclusion can be drawn, when $Q$ is invertible.

$$
\begin{aligned}
\Sigma Q &= Q \Lambda\\
\implies Q^{-1}\Sigma Q &= Q^{-1}Q \Lambda = \Lambda
\end{aligned}
$$

$\Sigma$ is a special matrix, because covariance matrices are symmetrical ($\sigma_{ij} = \sigma_{ji}$) and hence they have exactly $n$ eigenvectors which are orthogonal. **This theorem, for the curious, is proven below, after the derivation of the use of Mahalanobis distance in generative LDA.**

The inverse of square matrices holding orthogonal vectors exists, and it is exactly their transpose:

$$
Q^{-1}=Q^T
$$

The reasoning is trivial. Nondiagonal entries of $(QQ^T)$ are products of different eigenvectors, which are orthogonal, and hence their dot product is zero. While at the diagonal is the square of the Euclidean $(\operatorname{L}_2)$ length/norm of the eigenvector (which is $1$ if they are chosen to be unit vectors):

$$
QQ^T =
\begin{bmatrix}
q_1^Tq_1 & q_1^Tq_2 & \cdots & q_1^Tq_n \\
q_2^Tq_1 & q_2^Tq_2 & \cdots & q_2^Tq_n \\
\vdots   & \vdots   & \ddots & \vdots   \\
q_n^Tq_1 & q_n^Tq_2 & \cdots & q_n^Tq_n
\end{bmatrix}\\

(QQ^T)_{ij} = q_i^Tq_j =
\begin{cases}
0, & i \ne j
\quad\\[4pt]
\lVert q_i\rVert_2^2, & i=j
\quad
\end{cases}\\
QQ^T =
\begin{bmatrix}
\underbrace{q_1^Tq_1}_{\lVert q_1\rVert_2^2=1}
&
\underbrace{q_1^Tq_2}_{=0}
&
\cdots
&
\underbrace{q_1^Tq_n}_{=0}
\\
\underbrace{q_2^Tq_1}_{=0}
&
\underbrace{q_2^Tq_2}_{\lVert q_2\rVert_2^2=1}
&
\cdots
&
\underbrace{q_2^Tq_n}_{=0}
\\
\vdots & \vdots & \ddots & \vdots
\\
\underbrace{q_n^Tq_1}_{=0}
&
\underbrace{q_n^Tq_2}_{=0}
&
\cdots
&
\underbrace{q_n^Tq_n}_{\lVert q_n\rVert_2^2=1}
\end{bmatrix}
$$

$$
\begin{aligned}
&\Sigma Q = Q \Lambda\\
\implies &\boxed{Q^{-1}\Sigma Q = Q^{T}\Sigma Q = \Lambda}
\end{aligned}
$$

Please note that when the eigenvectors are chosen not to have unit length, then the diagonal of the above matrix will not be ones, so $Q^TQ \neq I$ and hence the eigenvalues in $\Lambda$ get scaled by the squares of the $L_2$ lengths of their eigenvectors.  

The above result is important because the $z$-score transformation by matrix $Q$ yields:

$$
\begin{aligned}
\operatorname{Cov}(zQ)
&=
\mathbb{E}\left[
\left(zQ-\mathbb{E}[zQ]\right)^T
\left(zQ-\mathbb{E}[zQ]\right)
\right]
\\[4pt]
&=
\mathbb{E}\left[
\left(Q^Tz^T-Q^T\mathbb{E}[z]^T\right)
\left(zQ-\mathbb{E}[z]Q\right)
\right]
\\[4pt]
&=
\mathbb{E}\left[
Q^T
\left(z-\mathbb{E}[z]\right)^T
\left(z-\mathbb{E}[z]\right)
Q
\right]
\\[4pt]
&=
Q^T
\mathbb{E}\left[
\left(z-\mathbb{E}[z]\right)^T
\left(z-\mathbb{E}[z]\right)
\right]
Q
\\[4pt]
&=
Q^T\operatorname{Cov}(z)Q\\
&= \boxed{Q^T \Sigma Q}\\
&\Sigma\ \text{is symmetric}\\
&Q\ \text{is orthonormal eigenbasis of}\ \Sigma \\
\implies &= \boxed{\Lambda}
\end{aligned}
$$

Therefore, the transformed data has diagonal covariance matrix (only the variances are nonzero), hence the new features, formed by linear combinations of the original features are **uncorrelated**. So the idea is, instead of measuring unusualness of original data, instead, **measure unusualness of the transformed data which is uncorrelated**, by calculating the $L_2$ norm of $\vec{z}Q$ which is:

$$
\operatorname{L}_2(\vec{z}Q) =\sqrt{ \sum_{i=1}^{n} \left(\frac{z_i \vec{q_i}}{\lambda_i}\right)^2}
$$

If eigenvectors of $Q$ are chosen to be unit vectors, then $Q$ is a rotational matrix, that is, it preserves Euclidean properties but it is important to note **it is not in fact required to measure Mahalanobis distance**. The eigenvectors can have arbitrary $L_2$ lengths but then the variances in the diagonal of $\Lambda$ are scaled by the respective squares of the $L_2$ lengths of their corresponding eigenvectors, and hence the Mahalanobis distance needs to be adjusted as:

$$
\begin{aligned}
\operatorname{L}_2(\vec{z}Q) &=\sqrt{ \sum_{i=1}^{n} \left(\frac{z_i \hat{q_i}\lVert \vec{q_i} \rVert_2^2}{\Lambda_{ii}}\right)^2}\\
\Lambda_{ii} &= \lVert \vec{q_i} \rVert_2^2 \lambda_i
\end{aligned}
$$

In generative LDA, the Mahalanobis distance is exponentially weighted to measure the probability of the data point $\vec{x}$ belonging to a class $c$.

Formally, assuming data has normal distribution:

$$

\operatorname{p}(\vec{x}\mid c)
=
\frac{1}{(2\pi)^{n/2}\mid\Sigma\mid^{1/2}}
\exp\left(
-\frac12
(\vec{x}-\vec{\mu}_c)^T
\Sigma^{-1}
(\vec{x}-\vec{\mu}_c)
\right).
$$

Where $
(\vec{x}-\vec{\mu}_c)^T
\Sigma^{-1}
(\vec{x}-\vec{\mu}_c)$ is numerically the Mahalanobis distance.

**Theorem**

A symmetric matrix $A^{nn}$ has exactly $n$ orthogonal eigenvectors.

**Proof**

<!--Symmetric matrix has at least one eigenvector-->

**Lemma**

A symmetrical matrix $A^{nn}$ has at least one eigenvector.

**Proof**

Consider the following multi-variable functions:

$$
\begin{aligned}
f(\vec{x}) &= \vec{x}^TA\vec{x}\\
g(\vec{x}) &= \vec{x}^T\vec{x} = 1
\end{aligned}
$$

Where
- $g$ in its explicit form is a **constraint function**
- $g$ in its implicit form is a **constraint equation**
- The set $S$ for which the **constraint equation** holds true is the **constraint set/level set**:

$$
S=\{\vec{x}∈\mathbb{R}^n : \vec{x}^T\vec{x}=1\}
$$

By the **Topoligical Extreme Value Theorem**:

- If $X \subseteq K$ is a compact set and $K$ is the ambient space of the abstract topological space $(K, \tau)$
- If $f: X \to Y \subseteq \mathbb{R}$ is continuous (everywhere)

Then $f$, whose domain is constrained to unit vectors, evidently satisfies these criterions and hence attains its maximum at some point $\vec{x} \in X$.

Since $\vec{s}$ is an extremum of the constrained domain version of $f$, its gradient $\nabla f$ with respect to its coordinate variables of $\vec{x}$ is equal to zero. The problem is, the original definition of $f$ is insensitive of the constraint, and so is its derivative.

Precisely, the gradient inherently considers small perturbations in every coordinate direction around the point. Therefore, when differentiating $f$ as a function defined on the ambient space, it (most probably) takes into account how $f$ changes toward points both inside and outside a given constraint set.

$$
\nabla f(\vec{s}) =
\begin{pmatrix}
\frac{\partial}{\partial x_1} f\\
\vdots\\
\frac{\partial}{\partial x_n} f
\end{pmatrix}\\
\frac{\partial}{\partial x_i} f(\vec{s}) = 
\lim_{h\to 0}
\frac{f(\vec{x}+h\vec{e}_i)-f(\vec{x})}{h}.
$$

Where $\vec{e}_i$ is the unit vector in which $e_i=1$ and all other coordinates are zero. This means for the calculation of the $i$th partial derivative at a point $\vec{s}$ involves taking into account vector points that have their $i$th coordinates in a small neighborhood of the $i$th coordinate of $\vec{s}$.

If for each coordinate there existed a small interval around the respective coordinate of the analyzed point so that arbitrary perturbations to just that one coordinate up to the boundaries of that interval keeps us inside the **constraint set**, then the gradient numerically coincides with the gradient of a truly constrained version of the function:


$$
\begin{aligned}
&\forall i\in\{1,\ldots,n\},\quad
\exists\,\varepsilon_i>0
\quad\text{such that}\\
&\vec{s}+h\vec{e}_i\in S
\quad\forall h\in(-\varepsilon_i,\varepsilon_i).
\\
\Longrightarrow&
\boxed{\nabla f(\vec{s})=\nabla(f|_S)(\vec{s})}
\end{aligned}
$$

This is of course highly unlikely, so we want to derive a new function which is truly constrained.

The **implicit function theorem** indirectly proves the existence of one-variable, vector-valued parametrized curve functions $\vec{x}(t)$ whose range/value set is a **level (sub)set** satisfying an **implicit function/constraint equation** locally around a point of the **explicit constraint function**.

That means, $\exists I$ open interval, so for $\forall t \in I$ the domain of function $f$ can not leave the **constraint set** when $f(\vec{x}(t))$ is differentiated with respect to $t$ at some point $t^{*} \in I$, so we indeed obtain the zero gradient there.

$$
\begin{aligned}
&\forall t \in I:\\
&g(\vec{x}(t)) = g(x_1(t), x_2(t)...,x_n(t))=1\\
\xrightarrow{\frac{d}{dt}\text{const=0}} &\frac{d}{dt} g(\vec{x}(t)) = 0\\
\text{Let } &\vec{s} = \vec{x}(t^*)\\
\implies &\frac{d}{dt} f(\vec{x}(t))\bigg|_{t=t^*} = 0
\end{aligned}
$$

It is not hard to construct a differentiable curve function that equals $\vec{s}$ for $\vec{x}(0)$:

$$
\begin{aligned}

\end{aligned}
$$

$$
\begin{aligned}
&\vec{x}(t) = \vec{s} + t\vec{v}\\
\implies &\vec{x}(0)=\vec{s}\\
\implies &\frac{d}{dt} \vec{x}(t) = \lim_{h \to 0} \frac{\vec{s} + h\vec{v} - \vec{s}}{h}=\lim_{h \to 0} \frac {h\vec{v}}{h}=\vec{v}
\end{aligned}
$$

But that generally does not satisfy $f(\vec{x}(t))=\text{const}$ in any **neighborhood** of $t$.

The **implicit function theorem** states, for multi variable single/scalar valued functions:

$$
\begin{aligned}
&\begin{cases}
g \in C^1\\
\exists \frac{\partial}{\partial x_k} g\neq 0
\end{cases}\\
\implies
&\begin{cases}
\exists (U = \prod_{i=1}^{n-1}\ I_i\ \text{open interval}) \subseteq \mathbb{R}^{n-1}\\
\exists (\phi: U \to \mathbb{R}) \in C^1\\
\text{such that: }\\
\forall \vec{v} \in U: \phi(\vec{v})=x_k
\end{cases}
\end{aligned}
$$

In other words, $x_k$ is locally expressible by a (continuously) differentiable function of all the other coordinate variables, provided $g$ is continuously differentiable and has at least one nonzero directional derivative at the point of interest.

Note that the coordinate $x_k$ being expressed may not take on every value of some open interval.

For our particular function $g$:
- It is a polynomial, and hence $\in C^{\infty}$ (infinitely continuously differentiable)
- Its gradient is $\nabla g = 2\vec{x}$ and $\vec{x}^T\vec{x}=1$ and hence the gradient of the explicit unconstrained $g$ can not be null vector at the extremum point of its constrained implicit version

Hence $g$ satisfies the conditions of the **implicit function theorem**.

<!--The gradient of an implicit function is perpendicular to any tangential direction-->

**NOTE/Lemma**

To demonstrate how the **IFT** can be used to construct and use parametrized curves in proofs, let's prove that the gradient of a function is perpendicular to all tangetial directions at any point $\vec{s}$ of an implicit **constraint equation/level set** derived from that function. ($f(\vec{x})=y \to f(\vec{x})=\text{const}$)

**Proof**

Let $\vec{w}$ be arbitrarily chosen vector perpendicular to $\nabla g(\vec{x})$ at point $\vec{s}$, so $\nabla g(\vec{s}) \vec{w}=0$

If $g$ satisfies the conditions of the **implicit function theorem**, then in some neighborhood $U \subseteq \mathbb{R}^{n-1}$ of $\vec{s}_{-k} \in \mathbb{R}^{n-1}$:

$$
\forall \vec{v}\ \in U:\\
x_k=\phi(\vec{v})
$$

And to construct our one-variable, vector valued parametrized curve function:

$$
\begin{aligned}
x_i(t) &= \vec{s} + \vec{v}t\quad \forall i \neq k\\
x_k(t) &= \phi(x_1,..,x_{k-1},x_{k+1},x_n)\\
\implies &\forall t\ \text{such that}\ \vec{x}_{-k}(t) \in U:\\
&\begin{cases}
 g(\vec{x}(t))=\text{const}\\
 \exists \frac{d}{dt} g(\vec{x}(t))
 \end{cases}\\
\implies &g(\vec{x}(0))=g(\vec{s})
\end{aligned}\\
$$

Consider the derivative of **constraint function** $g$ with respect to $t$, applying the chain rule:

$$
\begin{aligned}
&g(\vec{x}(t))=\text{const}\quad \forall\vec{x}_{-k}(t) \in U\\
\implies &\frac{d}{dt} g(\vec{x}(t))=0\\
\implies &=\nabla g(\vec{x})\bigg|_{\vec{x}=\vec{x}(t)} \cdot \frac{d}{dt}\vec{x}(t)\\
&=\nabla g(\vec{x})\bigg|_{\vec{x}=\vec{x}(t)} \cdot \frac{d}{dt}\vec{x}(t)=0\\
\implies &\nabla g(\vec{x})\bigg|_{\vec{x}=\vec{x}(0)=\vec{s}} \cdot \frac{d}{dt}\vec{x}(t)=0\bigg|_{t=0} = 0\\
\implies &\left(\frac{d}{dt}\vec{x}(t)\right)_i\bigg|_{t=0}=w_i\quad \forall i\neq k
\end{aligned}
$$

So when $i \neq k$, the $i$th coordinate of $\frac{d}{dt}\vec{x}(t)$ at $t=0$ is the $i$th coordinate of $\vec{w}$. Indeed, the goal is to show the tangential direction is exactly the same as $\vec{w}$ at $t=0$, because $\vec{w}$ is an arbitrarily chosen perpendicular vector (to $\nabla g$), and hence then the lemma would be proven for all possible tangential directions. In order to show:

$$
\vec{w} = \frac{d}{dt}\vec{x}(t)\bigg|_{t=0}
$$

...the only question needing to be answered, is whether the $k$th component of the tangential direction is $w_k$:

$$
\left(\frac{d}{dt}\vec{x}(t)\right)_k\bigg|_{t=0}\stackrel{?}{=}w_k
$$

We know the following:
- It is already known that the gradient vector is perpendicular to the tangential direction $\frac{d}{dt}\vec{x}(t)\bigg|_{t=0}$
- It is already known that the gradient vector is perpendicular to $\vec{w}$

These two equations give us a system of equations to solve for the $k$th coordinate of the tangential direction.

$$
\begin{aligned}
&\begin{cases}
\nabla g(\vec{x})\bigg|_{\vec{x}=\vec{x}(0)=\vec{s}}\cdot \frac{d}{dt}\vec{x}(t)\bigg|_{t=0}=0\\
\nabla g(\vec{x})\bigg|_{\vec{x}=\vec{x}(0)=\vec{s}}\cdot \vec{w}=0
\end{cases}\\
\xrightarrow{\text{Subtracting 2.}} &\left(\sum_{i \neq k}^{n} \left(\nabla g(\vec{x})\bigg|_{\vec{x}=\vec{s}}\right)_i\cdot(w_i - w_i)\right) +\\
&+ \left(\nabla g(\vec{x})\bigg|_{\vec{x}=\vec{s}}\right)_k\cdot\left(\left(\frac{d}{dt}\vec{x}(t)\bigg|_{t=0}\right)_k - w_k\right)=0\\
&=\left(\nabla g(\vec{x})\bigg|_{\vec{x}=\vec{s}}\right)_k\cdot\left(\left(\frac{d}{dt}\vec{x}(t)\bigg|_{t=0}\right)_k - w_k\right)=0\\
\xrightarrow{\left(\nabla g(\vec{x})\bigg|_{\vec{x}=\vec{s}}\right)_k \neq 0} &\left(\frac{d}{dt}\vec{x}(t)\bigg|_{t=0}\right)_k - w_k=0\\
\implies &\boxed{\left(\frac{d}{dt}\vec{x}(t)\bigg|_{t=0}\right)_k = w_k}\\
\implies &\boxed{\vec{w} = \frac{d}{dt}\vec{x}(t)\bigg|_{t=0}}
\end{aligned}
$$

<!--Lagrange multiplier-->

**Introducing the Lagrange multiplier**

Now we can proceed with proving the original lemma, now that we know we can construct the said curve function $\vec{x}(t)$ so that it satisfies the **constraint equation** $g$ locally, and is also locally differentiable.

Since $f(\vec{x}(t))$ is guaranteed to have an extremum at $t^{*}=0$ (since the neighorhood of $\vec{x}(t^{*})$ is a subset of the full compact set containing the supremum), the derivative here, and only here, with respect to $T$, is guaranteed to be zero. While for $g(\vec{x}(t))$, the derivative  with respect to $t$ at all points of the neighborhood of $t^{*}$ is zero (including $t^{*}$):

$$
\nabla g(\vec{x})\bigg|_{\vec{x}=t^{*}} \cdot \frac{d}{dt} \vec{x}(t^{*})=0\\
\nabla f(\vec{x})\bigg|_{\vec{x}=t^{*}} \cdot \frac{d}{dt} \vec{x}(t^{*})=0
$$


Since at $t^*$ both gradient vectors $\nabla g(\vec{x})$ and $\nabla f(\vec{x})$ are perpendicular to $\frac{d}{dt}\vec{x}(t)$, it follows that **they must be parallel, that is, scalar multiples of each other**.
Writing the result with the Lagrange multiplier $\lambda$ yields:

$$
\nabla g(\vec{x})\bigg|_{\vec{x}=t^{*}}=\lambda \nabla f(\vec{x})\bigg|_{\vec{x}=t^{*}}
$$

In our particular case, $\nabla g$ is:

$$
\begin{aligned}
\nabla g &=
\begin{pmatrix}
\frac{\partial g}{\partial x_0} = 2x_0\\
\vdots\\
\frac{\partial g}{\partial x_n} = 2x_n
\end{pmatrix}\\
\implies &\boxed{\nabla g=2\vec{x}}
\end{aligned}
$$

And $\nabla f$ is:

$$
\begin{aligned}
f(\vec{x})
&=x^TAx\\
f(\vec{x})
&=
\sum_{i=1}^n\sum_{j=1}^n a_{ij}x_i x_j\\
\frac{\partial f}{\partial x_k}
&=
\frac{\partial}{\partial x_k}
\left(
\sum_{i,j}a_{ij}x_i x_j
\right).
\end{aligned}
$$

There are two ways $x_k$ can occur:

$$
i=k
\qquad\text{or}\qquad
j=k.
$$

Therefore,

$$
\frac{\partial}{\partial x_k} f
=
\sum_{j=1}^n a_{kj}x_j
+
\sum_{i=1}^n a_{ik}x_i.
$$

The first sum is exactly the $k$-th component of $Ax$:

$$
(Ax)_k=\sum_{j=1}^n a_{kj}x_j.
$$

The second sum is exactly the $k$-th component of $A^Tx$:

$$
(A^Tx)_k=\sum_{i=1}^n a_{ik}x_i.
$$

Hence

$$
\frac{\partial}{\partial x_k} f
=
(Ax)_k+(A^Tx)_k.
$$

Since this holds for every $k$,

$$
\boxed{\nabla f=Ax+A^Tx}.
$$

If $A$ is symmetric, then $A^T=A$, and therefore

$$
\boxed{\nabla f=2Ax}.
$$

We know both gradients are perpendicular to the same tangential direction at point $\vec{s}$, so the two are parallel:

$$
\begin{aligned}
& 2A\vec{s} = \lambda 2\vec{s}\\
\implies & \boxed{A\vec{s}=\lambda\vec{s}}
\end{aligned}
$$

Which is the eigenvalue problem, and hence $\vec{s}$ not just exists, but is also an eigenvector.

**Q.E.D.**
Any symmetric matrix has at least one eigenvector.

<!--If a symmetrical matrix has at least one eigenvector, it can be extended into an orthogonal eigenbasis of the complete space-->

**Lemma**

If we know a symmetric matrix has at least one eigenvector, then it has exactly $n-1$ more eigenvectors, $n$ in total.

**Proof**

The above maximization problem is repeated, but with vectors perpendicular to all other already found.

To further constrain the domain of $f$, $g$ becomes a vector-valued function holding individual constraint equations, for convenience, constrained to **zero**. Let $n$ be the number of orthogonal eigenvectors already found, then the next function $g$ is:

$$
\vec{g}_n(\vec{x}) = 
\begin{pmatrix}
\vec{x}^T\vec{x}-1\\
\vec{v}_1^T\vec{x}\\
\vdots\\
\vec{v}_n^T\vec{x}
\end{pmatrix}
$$

Note the first constraint is the unit vector constraint.

The Jacobian matrix of this function is invertible, and is continuously differentiable, and hence satisfies the **General IFT** and therefore all the output variables are expressible by the input variables locally (to the input variables) to satify all the **constrain equations**.

It would lead to contradiction if there were less than $n$ eigenvectors, because we know that in $\mathbb{R}^n$ every orthogonal basis that can express all the vector space must have exactly $n$ orthogonal vectors. Therefore if we could not extend our collection of less than $n$ orthogonal vectors with one more, that would imply any other vector in $\mathbb{R}^n$ can be expressed with less than $n$ vectors which is not possible. 

**Q.E.D.**
Now we know that any symmetrical matrix has exactly $n$ perpendicular eigenvectors.

<!--Implicit function theorem-->

**Implicit Function Theorem Proof**

The implicit function theorem is just a specific application of the inverse function theorem.

The theorem requires a $C^1$ function defined over some open set $Q \subseteq R^m$, and the range of $f$/image of $Q$ is some set $W \subseteq R^n$ and $m>n$:

$$
\begin{aligned}
&f: Q \subseteq \mathbb{R}^{m} \to W \subseteq \mathbb{R}^n\\
&m > n\\
&Q\ \text{is open}\\
&f\ \text{is}\ C^1\ \text{over Q}
\end{aligned}
$$

It is also required that among the $m$ input variables, there $\exists\ n$ input variables, denoted by coordinates of a dummy vector $\vec{v}$, for which the partial Jacobian of $f$ is invertible at some $\vec{a} \in Q$:

$$
\exists \left(D_{\vec{v}}f\bigg|_{\vec{a}}\right)^{-1}
$$

Furthermore, $f$ is known to equal some constraint vector $\vec{c}$ at vector $\vec{a}$:

$$
f(\vec{a})=\vec{c}
$$

These requirements motivate us to separate the $m$ input variables into two groups, one denoted by a dummy vector $\vec{u} \in \mathbb{R}^{m-n=k}$ and one by a dummy vector $\vec{v} \in \mathbb{R}^n$. Hence $f$ can also be written as:

$$
\begin{aligned}
&f: Q \subseteq \mathbb{R}^{k+n} \to W \subseteq \mathbb{R}^n\\
&f(\pi_{\vec{u}}(\vec{x}), \pi_{\vec{v}}(\vec{x}))=f(\vec{x})
\end{aligned}
$$

Then the theorem says $\exists\ \text{open}\ U \subseteq \mathbb{R}^k$ neighborhood of $\pi_{\vec{u}}(\vec{a})$ and $\exists\ \text{open}\ V \subseteq \mathbb{R}^n$ neighborhood of $\pi_{\vec{v}}(\vec{a})$ and a unique function $\Phi: U \to  V$ such that:

$$
f(\pi_{\vec{u}}(\vec{x}), \Phi(\pi_{\vec{u}}(\vec{x})))=c\quad \forall\ \pi_{\vec{u}}(\vec{x}) \in U
$$

And $\Phi$ is $C^1$ over $U$. $V$ is known to contain the image of $U$ but might not equal it. It is a codomain, not (necessarily) the range.

That means, intuitively, given $n$ constraint equations, giving values to $k=m-n$ input variables, the remaining $n$ input variables can be solved for/can be expressed in function of the $k$ variables in some small neighborhood of a point in which the partial Jacobian with respect to those $n$ input variables is invertible.

**Proof**

Let a function $g: \mathbb{R}^{k+n} \to \mathbb{R}^{k+n}$ be defined as $g(\vec{x}, \vec{y})=(\vec{x}, f(\vec{x}, \vec{y}))$ over the same open domain as $f$, which is $Q$, and $\vec{x}$ represents coordinates $\vec{u}$ and $\vec{y}$ represents coordinates $\vec{v}$.

The key takeaway is that if the partial Jacobian $D_{\vec{v}}f\bigg|_{\vec{a}}$ of $f$ is invertible, then the full Jacobian of $g$ is also invertible: 

$$
\begin{aligned}
&J_{g}(\vec{x},\vec{y}) =
\begin{pmatrix} D_{\vec{x}}(\vec{x}) && D_{\vec{y}}(\vec{x})\\
D_{\vec{x}} f(\vec{x},\vec{y}) && D_{\vec{y}} f(\vec{x},\vec{y})
\end{pmatrix}\\
&=
\begin{pmatrix} I_n && 0_n\\
D_{\vec{x}} f(\vec{x},\vec{y}) && D_{\vec{y}} f(\vec{x},\vec{y}) \end{pmatrix}\\

\implies &\det(J_{g}(\vec{x},\vec{y})) = \det(I_n) \cdot \det(D_{\vec{y}} f(\vec{x},\vec{y}))\\
&= \det(D_{\vec{y}} f(\vec{x},\vec{y}))\\

&D_{\vec{y}} f(\pi_{\vec{u}}(\vec{a}),\pi_{\vec{v}}(\vec{a}))=D_{\vec{y}} f(\vec{a})\ \text{is  invertible}\\
\implies &\det(D_{\vec{y}} f(\vec{x},\vec{y})) \neq 0\\
\implies &\det(J_{g}(\vec{x},\vec{y})) \neq 0
\end{aligned}
$$

And since $f \in C^1$ over $Q$ so $g \in C^1$ over $Q$ as well, and therefore by the inverse function theorem $g$ has an inverse/is bijective between two open sets, one containing $\vec{a} \in O \subseteq \mathbb{R}^{k+n}$ and one containing $(\pi_{\vec{u}}(\vec{a}), f(\vec{a})=\vec{c}) \in P \subseteq \mathbb{R}^{k+n}$.

Note that when $(\vec{x}, \vec{c}) \in P$, then $g^{-1}(\vec{x}, \vec{c})$ exactly means that $f(\vec{x}, \vec{y})=c$:
$$
\begin{aligned}
&g^{-1}(\vec{x}, \vec{c})=(\vec{x}, \vec{y})\\
\iff &g(\vec{x},\vec{y})=(\vec{x},f(\vec{x},\vec{y})=c)
\end{aligned}
$$

Since $P$ is an open neighborhood of vector $(\pi_{\vec{u}}(\vec{a}), f(\vec{a})=\vec{c})$, there $\exists$ a saturated open ball around that vector contained by $P$. If the $\vec{v}$ coordinates are kept fixed to match the coordinates of $\vec{c}$, and we only let the $\vec{u}$ coordinates be variable, then the distance of such vectors from $(\pi_{\vec{u}}(\vec{a}), \vec{c})$ is entirely determined by the other $\vec{u}$ coordinates:

$$
\begin{aligned}
&\mid\mid(\pi_{\vec{u}}(\vec{a}), \vec{c}) - (\vec{x}, \vec{c})\mid\mid=\mid\mid \pi_{\vec{u}}(\vec{a}) - \vec{x}\mid\mid
\end{aligned}

$$

That exactly means we have a saturated ball $U$ around $\pi_{\vec{u}}(\vec{a})$ for which $t(\vec{x})=(\vec{x}, \vec{c})\quad \vec{x} \in U$ is a subset of the ball around $(\pi_{\vec{u}}(\vec{a}), \vec{c})$.

$$
\begin{aligned}
&\mid\mid(\pi_{\vec{u}}(\vec{a}), \vec{c}) - (\vec{x}, \vec{c})\mid\mid < r\\
&\iff\\
&\mid\mid \pi_{\vec{u}}(\vec{a}) - \vec{x}\mid\mid<r
\end{aligned}
$$



Simplify $g^{-1}(\vec{x}, \vec{y})$ such that $\vec{y}$ is set to constant vector $\vec{c}$ and let it be defined over $U$, and extract the $\vec{v}$ coordinates from the resulting vector:

$$
\begin{aligned}
&\Phi(\vec{x})=\pi_{\vec{v}}(g^{-1}(\vec{x}, \vec{c}))\\
&\vec{x} \in U
\end{aligned}
$$

It is also known that $g^{-1}$ maps back to open set $O$ containing $(\pi_{\vec{u}}(a), \pi_{\vec{v}}(a))=\vec{a}$, which yields an open ball around $\vec{a}$. Analogously to the above reasoning, there $\exists$ a saturated open ball $V$ around $\pi_{\vec{v}}(\vec{a})$, such that the vectors from this ball, extended by fixed $\vec{v}$ coordinates of $\vec{a}$ form a subset of the ball around $\vec{a}$. This set $V$ must therefore contain the image of $\Phi(U)$ but note that $\Phi$ may not be bijective between $V$ and $U$ like $g$ is bijective between $O$ and $P$. So $V$ must contain the image of $\Phi(U)$ but it is just a codomain/may not equal the range.

Hence whenever $\vec{x} \in U$ the other $\vec{v}$ coordinates can be expressed by $\Phi$ so that $f$ retains its function value (the implicit constraint vector):

$$
\begin{aligned}
&\Phi: U \to V\\
&f(\vec{x}, \Phi(\vec{x}))=\vec{c}\quad \forall\ \vec{x} \in U
\end{aligned}
$$

$g^{-1}$ is a $C^1$ function. $(\vec{x}) \to (\vec{x}, \vec{c})$ is also $C^1$, and the projection $\pi_{\vec{v}}$ is also $C^1$. Therefore, $\Phi$ is also $C^1$.

**Q.E.D.**

<!--Inverse function theorem-->

**Inverse function theorem proof**

A function having an inverse over a set of input points means it is **bijective** between that set of input points and the image of those input points.

If $f: X \to Y$ is bijective between $X$ and $Y$:
- It is **injective** on $X$, meaning two different elements of $X$ are mapped to two different elements of $Y$, it is "one-to-one"
- it is **surjective** onto $Y$, meaning each element of $Y$ has an image in $X$. It basically means the codomain is not larger than the, meaning it exactly equals the range

So if a function is bijective between a (sub)domain and (sub)codomain, the **image/preimage points are uniquely paired**.

The inverse function theorem says:
- If $f: X \subseteq \mathbb{R}^n \to Y \subseteq \mathbb{R}^m$ is defined over some open set $X$ containing some point $\vec{a}$, and it is continously differentiable over $X$. The theorem assumes openness of $X$ entirely out of convenience and convention as differentiability at some point requires perturbations into its neighborhood, which are absorbed by the guaranteed ball neighborhood of the inner point in $R^n$ 
- If the Jacobian at $\vec{a}$ is invertible

Then we can find two open neighborhoods, $U \subset X$ containing $\vec{a}$ and $V \subset Y$ containing $f(\vec{a})$ for which $f$ is bijective (one-to-one), and its inverse is also continuously differentiable.

In $\mathbb{R}^n$, in an open set every point has an open neighborhood, which is precisely some fully saturated open ball around it. Furthermore every such saturated open ball is an open set, yet an open set may not exactly equal one particular saturated open ball.

First, let's find a closed ball $\overline{B}_{r_0}(\vec{a})$ around $\vec{a}$ for which $f$ can be shown to be injective. For now it is enough to just assume it exists, and it is known that it exists, because the fact that $\vec{a} \in X$ means that there exists an open ball around $\vec{a}$ with some positive radius, and then it is not hard to select a fully contained closed ball inside that with an even smaller positive radius.

Definition of open ball $B_{r_0}(\vec{a})$:

$$
B_{r_0}(\vec{a})=\{\vec{x}\in\mathbb R^n:\|\vec{x}-\vec{a}\|<r\}
$$

Definition of the closed ball $\overline{B}_{r_0}(\vec{a})$ which is called the closure of the above open ball, containing its border points:

$$
\overline{B}_{r_0}(\vec{a})=\{\vec{x}\in\mathbb R^n:\|\vec{x}-\vec{a}\|\le r\}
$$

Note: you can always select a saturated closed ball inside a saturated open ball and vice-versa.

Consider the weighted average of two vectors $\vec{x}$ and $\vec{y}$ from ball $\overline{B}_{r_0}(\vec{a})$:

$$
t \in [0, 1]\\
\gamma(t)=t\vec{x}+(1-t)\vec{y}\\
\gamma(t)=\vec{y}+t(\vec{x}-\vec{y})
$$

The second rewriting can intuitively be imagined as going from point $\vec{y}$ to point $\vec{x}$ through the "line/direction" towards $\vec{y}$, as $t \to 1$.

For $t \in [0, 1]$ the function value $\gamma(t)$ is also within the ball $\overline{B}_{r_0}(\vec{a})$:

$$
\begin{aligned}
&\mid\mid\gamma(t) - \vec{a}\mid\mid = \mid\mid t\vec{x} + (1-t)\vec{y} -\vec{a}\mid\mid \\
&= \mid\mid t(\vec{x}-\vec{a}) + (1-t)(\vec{y}-\vec{a})\mid\mid \\
&\leq \mid\mid t(\vec{x}-\vec{a}) \mid\mid + \mid\mid (1-t)(\vec{y}-\vec{a})\mid\mid\\
&\leq t\mid\mid \vec{x} - \vec{a} \mid\mid + (1-t) \mid\mid \vec{y} - \vec{a} \mid\mid\\
\xrightarrow{\mid\mid\vec{x}-\vec{a}\mid\mid, \mid\mid\vec{y}-\vec{a}\mid\mid \le r_0}
&\le tr_0 + (1-t)r_0=r_0
\end{aligned}
$$

The **fundamental theorem of calculus** says that the sign-sensitive difference in function value over a closed interval equals the accumulated sign-sensitive rate of change over that interval. Formally expressed, that is the integral of the derivative over that interval.

Since our closed ball is fully contained by the initial open set $X$ for which $f$ was defined, the derivatives $Df$ exist at every inner point and $f$ is defined at every point, including boundary points.

Using the fundamental theorem of calculus and the chain rule:

$$
f(\vec{x})-f(\vec{y})=\int_0^1 Df(\gamma(t))\frac{d}{dt}\gamma(t)dt\\
f(\vec{x})-f(\vec{y})=(\vec{x}-\vec{y})\int_0^1 Df(\gamma(t))dt
$$

If we could show that the integral of $Df$ is invertible, then injectivity would immediately follow. Assuming $f(\vec{x})=f(\vec{y})$:

$$
\begin{aligned}
\text{Let}\ &A=\int_0^1 Df(\gamma(t))dt\\
\implies &0A^{-1}=(\vec{x}-\vec{y})AA^{-1}\\
&0=(\vec{x}-\vec{y})I=\vec{x}-\vec{y}\\
\iff &\vec{x}=\vec{y}
\end{aligned}
$$

Given a **submultiplicative matrix norm**, if a matrix is "close enough" to the identity matrix, then it is invertible, precisely:

$$
\mid\mid A-I \mid\mid < 1\\
\implies \exists A^{-1}
$$

For the curious, this lemma is proven at the end of the article.

The idea is that if we could force $\mid\mid Df-I\mid\mid<1$ then it would also force $\mid\mid(\int Df)-I\mid\mid<1$:

$$
\begin{aligned}
&\bigg|\bigg| \int_0^1 Df(\gamma(t)) dt - I \bigg|\bigg|\leq \int_0^1 \mid\mid Df(\gamma(t))-I\mid\mid dt\\
&\text{if } \mid\mid Df(\gamma(t)) - I \mid\mid < 1\\
\implies &\bigg|\bigg| \int_0^1 Df(\gamma(t)) dt - I \bigg|\bigg| < 1
\end{aligned}
$$

Of course, $Df$ does not automatically have that property. However, it has been assumed that $Df$ is invertible at point $\vec{a}$.

Let's do some rebranding. Assume the original function was $g$ and the modified one is $f$, and let $f$ be:

$$
f=\left(Dg\big|_{\vec{a}}\right)^{-1}g
$$

If invertibility is proven for $f$ it is also proven for $g$ because $f$ has been derived from $g$ through an invertible operation. And the favourable condition obtained with this is that the Jacobian of $f$ at $\vec{a}$ this way is now the identity matrix:

$$
Df\big|_{\vec{a}}=\left(Dg\big|_{\vec{a}}\right)^{-1}Dg\big|_{\vec{a}}=I
$$

And it has also been assumed that $f$ is continuously differentiable, and it means there exists $\overline{B}_{r_0}(\vec{a})$ so that for any point $\vec{x}$ in the ball **any matrix norm** of the difference of the identity matrix and the Jacobian of $f$ at $\vec{a}$ is beyond some constant, here in particular one. We have already shown that some fully contained closed ball exists around $\vec{a}$, we just need to adjust the radius (if required) to be small enough in order to push $Df$ close enough to $I$.

That is the exact meaning of the continuity of the derivative. But as per the previous reasoning this proves invertibility of $\int_0^1 Df(\gamma(t))dt$

$$
\begin{aligned}
&\forall\ q_0>0\ \exists\ r_0>0\\
&\text{such that}\ \forall\ \vec{x} \in\ B_{r_0}(\vec{a})\\
&\mid\mid Df(\vec{x})-I\mid\mid < q_0\\
&\text{let}\ q_0=1\\
&\bigg|\bigg| \int_0^1 Df(\gamma(t)) dt - I \bigg|\bigg|\leq\\
&\leq \int_0^1 \mid\mid Df(\gamma(t))-I\mid\mid dt<q_0=1
\end{aligned}
$$

And hence it proves injectivity of $f$ for all points of the ball around $\vec{a}$ that brings $Df$ close enough to the identity matrix.

Without specifically defining the exact image of the points in the ball, it is already proven that $f$ is bijective over the ball and its image and hence it has an inverse there.

But we also want to show:
- There exists an open set, particularly an open ball around $f(\vec{a})$, whose preimage is contained by $B_{r_0}(\vec{a})$, and that these are the two open sets for which $f$ is bijective
- It must also be shown that the inverse is $C^1$

Please note that the preimage of the open ball of function values for which we show bijectivity is open (as per continuity of $f$) and is contained by the open version of our closed ball, but may not itself be a ball.

Wanted are thus those $\vec{y}$ points that are attained by $f$. A proving strategy is needed. Begin with the function:

$$
f(\vec{x})=\vec{y}
$$

Note that $Df$ is close to $I$ for points inside our ball. This causes the derivative of the below function to be bounded by one, meaning the function value increases slower than the input:

$$
\begin{aligned}
&f(\vec{x})=\vec{y}\\
\iff &\vec{x}=\vec{x}-f(\vec{x})+\vec{y}\\
&\text{Let}\ \vec{y}\ \text{be a constant}\ \vec{y}_0\\
&T_{\vec{y}_0}(\vec{x})=\vec{x}-f(\vec{x})+\vec{y}_0\\
\implies &DT_{\vec{y}_0}(\vec{x})=I-Df(\vec{x})\\
\implies &\mid\mid DT_{\vec{y}_0}(\vec{x}) \mid\mid < 1\ \forall\ \vec{x}\ \in\ \overline{B}_{r_0}(\vec{a})
\end{aligned}
$$

The fact that the function value increases slower than the input intuitively means the function shrinks distances between points. Indeed, parametrizing $T_{\vec{y}_0}$ analogously and formalizing again with the fundamental theorem of calculus:

$$
\begin{aligned}
&\mid\mid T_{\vec{y}_0}(\vec{x})-T_{\vec{y}_0}(\vec{y}) \mid\mid \le \mid\mid\vec{x}-\vec{y}\mid\mid\cdot\int_0^1 \mid\mid DT_{\vec{y}_0}(\gamma(t)) \mid\mid dt\\
\implies &\mid\mid T_{\vec{y}_0}(\vec{x})-T_{\vec{y}_0}(\vec{y}) \mid\mid < \mid\mid\vec{x}-\vec{y}\mid\mid\cdot\ q_0\quad q_0<1
\end{aligned}
$$

Note that So $T$ indeed shrinks distances and hence is a **contraction**. If only we could show that it maps points into itself, Banach's theorem would be applicable and it would mean there exists exactly one fixed point/point of attraction $\vec{x}_0$ of function $T_{\vec{y}_0}$ that does not move:

$$
\begin{aligned}
&T_{\vec{y}_0}(\vec{x}_0)=\vec{x}_0\\
\iff &\vec{y}_0 - f(\vec{x}_0) + \vec{x}_0 = \vec{x}_0\\
\iff &f(\vec{x}_0)=\vec{y}_0
\end{aligned}
$$

That means the fixed point provided by Banach's theorem would be the solution for $\vec{y}_0$.

Banach's theorem, stated:
- Given a function $f: A \to A$ mapping into itself
- If $A$ is complete
- If $f$ is a contraction, that is, shrinks distances

Then there's exactly one fixed point such that $f(x^*)=x^*$.

Note that $\overline{B}_{r_0}(\vec{a})$ is complete, while $B_{r_0}(\vec{a})$ is not. This is why we needed a closed ball.

It has been shown that $T_{\vec{y}_0}$ shrinks distances, and it is yet to be shown that $T$ maps into itself, meaning:

$$
T_{\vec{y}_0}: \overline{B}_{r_0}(\vec{a})\ \to\ \overline{B}_{r_0}(\vec{a})\\
\iff \mid\mid T_{\vec{y}_0}(\vec{x})-\vec{a}\mid\mid \le r_0
$$

Consider the following function and its derivative:

$$
\begin{aligned}
&h(\vec{x})=f(\vec{x})-f(\vec{a})-(\vec{x}-\vec{a})\\
&Dh(\vec{x})=Df(\vec{x})-I\\
\implies &\mid\mid Dh(\vec{x}) \mid\mid < 1\quad \forall\ \vec{x}\ \in\ \overline{B}_{r_0}(\vec{a})
\end{aligned}
$$

Analogously applying the fundamental theorem of calculus the following can be obtained:

$$
\begin{aligned}
&\mid\mid h(\vec{x})-h(\vec{y})\mid\mid < q_0\ \cdot\mid\mid \vec{x} - \vec{y} \mid\mid\quad q_0<1\\
\implies &\mid\mid h(\vec{x})-h(\vec{a})\mid\mid=\mid\mid h(\vec{x}) \mid\mid < q_0\ \cdot \mid\mid \vec{x}-\vec{a} \mid\mid\\
\implies &h(\vec{x}) < q_0r_0
\end{aligned}
$$

Rewriting $\mid\mid T_{\vec{y}_0}(\vec{x})-\vec{a}\mid\mid$ using $h(\vec{x})$:

$$
\begin{aligned}
&\mid\mid T_{\vec{y}_0}(\vec{x})-\vec{a} \mid\mid = \mid\mid \vec{y}_0-\vec{a}-h(\vec{x})\mid\mid \le\\
&\le \mid\mid \vec{y}_0-\vec{a} \mid\mid + \mid\mid h(\vec{x})\mid\mid\\
&\le\mid\mid \vec{y}_0-\vec{a} \mid\mid +\ qr_0
\end{aligned}
$$

If we impose upon $\vec{y}_0$ that it be close enough to $\vec{a}$, to obtain an open ball:

$$
\mid\mid \vec{y}_0-\vec{a}\mid\mid < (1-q_0)r_0
$$

Then we obtain (note the change from $\le$ to $<$):

$$
\begin{aligned}
&\mid\mid T_{\vec{y}_0}(\vec{x})-\vec{a} \mid\mid < (1-q_0)r_0 + q_0r_0\\
\implies &\mid\mid T_{\vec{y}_0}(\vec{x})-\vec{a} \mid\mid < r_0
\end{aligned}
$$

The preimage of the open ball $B_{(1-q_0)r_0}(f(\vec{a}))$ is also open since for a continuous function only an open preimage can have open image. We know that the preimage is contained by the closed ball $\overline{B}_{r_0}(\vec{a})$ but it should also intuitively be contained by just the open ball $B_{r_0}(\vec{a})$.

Indeed, considering the fixed point $\vec{x}^*$ for $\vec{y}_0$ we have:

$$
\begin{aligned}
&\mid\mid \vec{x}^* - \vec{a} \mid\mid = \mid\mid T_{\vec{y}_0}(\vec{x}^*) - \vec{a} \mid\mid < r_0\\
\implies &\vec{x}^* \in B_{r_0}(\vec{a})  
\end{aligned}
$$

So $V = B_{r_0(1-q_0)}(f(\vec{a}))$ and $U = f^{-1}(B_{r_0(1-q_0)}(f(\vec{a}))) \subseteq B_{r_0}$ so that the bijective function is:

$$
f: U \subseteq B_{r_0}(\vec{a})\to V=B_{(1-q_0)r_0}(f(\vec{a}))
$$

Again, note that the preimage of $B_{(1-q_0)r_0}(f(\vec{a}))$ is contained by $B_{r_0}(\vec{a})$, but it can not be shown that it equals $B_{r_0}(\vec{a})$. In a particular case the preimage might equal $B_{r_0}(\vec{a})$ but in generality it is not true. However nice it would be to show that $f$ is bijective between two balls (either open or closed), it can't be guaranteed.

Please note that the inverse function theorem could have been stated and shown for closed neighborhoods as well. Even showing that the inverse function is continuously differentiable doesn't specifically require open sets so long as it is proven that perturbations at border points towards the ambient space does not cause concerns about whether the function is defined outside the border. Hence when showing differentiability over a set it is convenient/elegant/conventional to show it over an open set where evaluation of the derivative at any point never requires leaving the open set where definition is guaranteed.

<!--Banach fixed-point theorem-->

**Banach fixed-point theorem proof**

Let $T: X \to X$ be a contraction for a complete metric space $X$ with metric function $d$, that is, $\exists q \in [0, 1)$ such that $d(T(x), T(y))\le q \cdot d(x, y)$ for $\forall x,y \in X$.

**Proof**

Steps:
- Show that the sequence $a_{n+1}=T(a_n)$ is Cauchy, that is, when $m>n$ and $n \to \infty$, $d(a_m, a_n)$ goes to zero
- Using the fact that $X$ is a complete metric space, assert that Cauchy property is equivalent with the convergence of $a_n$ to some $x^* \in X$
- Using continuity of $T$ assert that as $x_n \to x^*$, $T(x_n) \to T(x^*)$ due to the sequential equivalent characterization of continuity
- Using the fact that $x_{n+1}=T(x_n)$ (maps into itself), assert that $\lim x_n = \lim T(x_n)$
- Conclude that $x^*=T(x^*)$
- Show uniqueness of the limit

Let's show $a_n+1=T(a_n)$ is Cauchy for arbitrary $a_0 \in X$. Going from $a_0$ to $a_n$ there's a repeated application of $T$:

$$
a_n = T(T(......T(a_0)))\\
a_{n+1} = T(T(T(......T(a_0))))
$$

And we also know that each parallel iteration lessens the distance between $a_{n+1}$ and $a_n$:

$$
\begin{aligned}
 &d(a_{n+1}=T(a_n),\ a_n=T(a_{n-1}))\le\\
 \le &q \cdot d(a_{n}=T(a_{n-1}),\ a_{n-1}=T(a_{n-2}))\\
 &d(a_{n}=T(a_{n-1}),\ a_{n-1}=T(a_{n-2}))\le\\
  \le &q \cdot d(a_{n-1}=T(a_{n-2}),\ a_{n-2}=T(a_{n-3}))\\
 &\cdots\\ 
 &d(a_2,\ a_1)\le\\
 \le &q \cdot d(a_1,\ a_0)
 \end{aligned}
$$

Which means:

$$
\begin{aligned}
&d(a_2,\ a_1)\le q \cdot d(a_1, a_0)\\
&d(a_3,\ a_2)\le q \cdot d(a_2,\ a_1)\\
 \implies &d(a_3,\ a_2)\le q^2 \cdot d(a_1, a_0)\\
 &d(a_4,\ a_3)\le q\cdot d(a_3,\ a_2)\\
 \implies & d(a_4,\ a_3)\le q^3 \cdot d(a_1,\ a_0)\\
 \implies &\cdots\\
 \implies &d(a_{n+1},\ a_n)\le q^n \cdot d(a_1, a_0)\\
 \implies &d(a_{n+1}, a_n) \overset{n \to \infty}{\longrightarrow} 0
 \end{aligned}
 $$

To prove $a_n$ is Cauchy, we need to be able to show this exact result for arbitrary fixed $m>n$ as well, not just $m=n+1$:

$$
d(a_m, a_n) \overset{n \to \infty}{\longrightarrow} 0
$$

To show this, we have the triangle inequality:

$$
d(a_m,\ a_n) \le \sum_{k=n}^{m-1} d(a_n, a_{n+1})
$$

As per our earlier reasoning:

$$
d(a_m,\ a_n)\le \sum_{k=n}^{m-1} q^k d(x_1, x_0)
$$

$m$ is fixed, and finite number of terms each going to zero give a sum also going to zero right? The problem is that the distance must stay bounded by any chosen finite amount independently of $m$, that is, only $n$ can be a function of the bound.

That reasoning motivates the application of the finite geometric series identity:

$$
\begin{aligned}
&\sum_{k=n}^{m-1} q^k = \frac{q^n(1-q^{m-n})}{1-q}\\
&q^n(1-q^{m-n}) \le q^n\\
\implies &\frac{q^n(1-q^{m-n})}{1-q} \le \frac{q^n}{1-q}\\
\implies &d(a_1,\ a_0)\sum_{k=n}^{m-1} q^k \le d(a_1,\ a_0)\frac{q^n}{1-q}\\
\implies &d(a_m,\ a_n) \le d(a_1,\ a_0)\frac{q^n}{1-q}
\end{aligned}
$$

That means $d(a_m,\ a_n) \to 0$ as $n \to  \infty$ independently of $m>n$ and hence $a_n$ is Cauchy.

**Q.E.D.**

<!--Topological extreme value theorem-->

**Topological Extreme Value Theorem proof**

In an abstract topological space $(X, \tau)$, every subset $V \subseteq S$ has an open cover $\mathcal{U} \subseteq \tau$:

$$
V \subseteq \mathcal{U} = \bigcup_{U\in\mathcal{U}}U
$$

So it can be contained by a union of open sets of $X$.

$\tau$ is the topology of the topological space. It contains all the open sets of $X$.
- Contains the empty set and $X$
- Closed under unions
- Closed under finite intersections

$$
\begin{aligned}
&\text{(a)} && \varnothing,X\in\tau,\\ &\text{(b)} && \bigcup_{\alpha\in A}U_\alpha\in\tau &&\forall\ {U_\alpha}:\ {\alpha\in A}\subseteq\tau,\\ &\text{(c)} && \bigcap_{i=1}^{n}U_i\in\tau &&\forall\ U_1,\ldots,U_n\in\tau.
\end{aligned}
$$

Therefore in case of $f : X \to Y \subseteq \mathbb{R}$, for $Y$ we select such an open cover arbitrarily, and by definition of continuous functions over subsets of abstract topological spaces, the preimage of the open cover of $Y$ is also open.

Then, by definition of a compact subset of an abstract topological space, any open covers of $X$ has a **finite** open subcover.

But this essentially means the image of the finite cover of $X$ is a finite cover of $Y$, which is also a finite subcover of the initial open cover for $Y$ we started off with.

And since we selected the initial open cover of $Y$ arbitrarily, it means every open cover of $Y$ has a finite subcover as well. And since a subset of a topological space is compact if and only if every open cover has a finite subcover, $Y$ **must be compact** as well.

Since $Y$ is a subset of $\mathbb{R}$, it is a **metric space**, specifically an **Euclidean space**, and for Euclidean spaces compactness means $Y$ is **closed** and **bounded**, by the **Heine-Borel theorem**.

**Proof of Heine-Borel theorem**
**coming soon**

**Boundedness $\implies$ existence**  
Since $Y$ is bounded, the **least upper bound axiom** applies, and therefore $Y$ has a finite limit point that is its supremum.

**Closed $\implies$ containment**  
Every limit point $\in \overline{Y}$, that is, the closure (the closed version) of $Y$ contains every limit point of $Y$. And since $Y$ is closed, it contains its supremum.

The definition of a limit point of a set: such a point of the complete/topological space, that for all open neighborhoods/sets containing the point also contains a point of the subset other than the limit point:

$$
\forall\ U \in \mathcal{T}, \quad
x \in U \implies U \cap (A \setminus \{x\}) \neq \varnothing,
$$

The catch is: a limit point of set $Y$ does not have to be an element of $Y$.

The intuition is the example interval $(0, 1) \subseteq \mathbb{R}$ in which any open neighborhood of an interior point has infinitely many points of $(0, 1)$ other than the interior point. Points $1$ and $0$ are not contained by set $(0, 1)$ and only by the ambient space (and of course the complete/topological space), but still they are both limit points of $(0, 1)$.

The containment of the infimum is analogously provided by the **greatest lower bound axiom**.

**Q.E.D**